import Drive from '@ioc:Adonis/Core/Drive'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Media from 'App/Models/Media'
import { gameTypes } from 'App/Tools/Enums/MediaTypes'
import {
  createAlternativeText,
  defaultCoverAltText,
} from 'App/Tools/Functions/generateCoverAltText'
import { createFileName, defaultCoverFilename } from 'App/Tools/Functions/generateCoverName'
import { standardize } from 'App/Tools/Functions/standardizeCover'
import CreateGameValidator from 'App/Validators/CreateGameValidator'
import UpdateGameValidator from 'App/Validators/UpdateGameValidator'

export default class GamesController {
  public async addOneGame({ request, response }: HttpContextContract) {
    const payloadValidation = await request.validate(CreateGameValidator)
    const {
      mediaParentId,
      type,
      cover,
      name,
      released,
      synopsis,
      status,
      rating,
      opinion,
      isFavorite,
      ...specificGameInfos
    } = payloadValidation

    const searchIfGameAlreadyExist = await Media.query()
      .from('medias')
      .where('type', type)
      .andWhere('name', name)
      .andWhere('released', released)
    const gameAlreadyExist = searchIfGameAlreadyExist.length > 0

    if (gameAlreadyExist) {
      return response.status(400).json({
        message: 'Ce film a déjà été ajouté !',
        media: searchIfGameAlreadyExist,
      })
    }
    const mediaIsGameType = gameTypes.includes(type)
    if (!mediaIsGameType) {
      return response.status(400).json({
        message: 'Le type du media ne correspond pas à la catégorie jeu vidéo',
      })
    }

    // manage covers
    let coverName: string = defaultCoverFilename
    let coverAltText: string = defaultCoverAltText
    if (cover) {
      coverName = createFileName()
      coverAltText = createAlternativeText(type, name)
      const coverFormated = standardize(cover.tmpPath)
      await Drive.put(`covers/${coverName}`, await coverFormated, {
        contentType: `image/jpg`,
      })
    }

    const generalMediaInfos = { mediaParentId, type, name, released, synopsis }
    const coverInfo = { filename: coverName, alternative: coverAltText }
    const reviewInfo = { status, rating, opinion, isFavorite }

    const trx = await Database.transaction()
    try {
      const newMedia = await Media.create(generalMediaInfos)
      await newMedia.related('gameInfo').create(specificGameInfos)
      await newMedia.related('cover').create(coverInfo)
      await newMedia.related('review').create(reviewInfo)

      await trx.commit()
      return response.status(201).json({ newMedia, coverInfo, reviewInfo })
    } catch (error) {
      await trx.rollback()
      if (coverName !== defaultCoverFilename) {
        await Drive.delete(`covers/${coverName}`)
      }
      return response.status(400).json(error)
    }
  }

  public async updateOneGame({ request, params, response }: HttpContextContract) {
    const mediaId = params.id
    const mediaToUpdate = await Media.find(mediaId)
    const mediaDoesntExist = !mediaToUpdate
    if (mediaDoesntExist) {
      return response.status(404).json('Aucun résultat pour cet identifiant')
    }

    const payloadValidation = await request.validate(UpdateGameValidator)
    const { mediaParentId, type, name, released, synopsis, ...specificGameInfos } =
      payloadValidation
    const generalMediaInfos = { mediaParentId, type, name, released, synopsis }

    const mediaIsGameType = gameTypes.includes(type)
    if (!mediaIsGameType) {
      return response.status(400).json({
        message: 'Le type ne correspond pas à la catégorie jeu vidéo',
      })
    }

    const trx = await Database.transaction()

    try {
      mediaToUpdate.merge(generalMediaInfos).save()
      await mediaToUpdate.related('gameInfo').updateOrCreate({}, specificGameInfos)

      await trx.commit()
      return response.status(201).json(mediaToUpdate)
    } catch (error) {
      await trx.rollback()
      return response.status(400).json(error)
    }
  }

  public async getAllGames({ response }: HttpContextContract) {
    const datas = await Media.query()
      .from('medias')
      .join('games_infos', 'medias.id', '=', 'games_infos.media_id')
      .join('reviews', 'medias.id', '=', 'reviews.media_id')
      .join('covers', 'medias.id', '=', 'covers.media_id')
      .select(
        'medias.id',
        'medias.media_parent_id',
        'medias.name',
        'medias.type',
        'medias.released',
        'medias.synopsis',
        'covers.filename',
        'covers.alternative',
        'games_infos.developer',
        'games_infos.publisher',
        'games_infos.platform',
        'reviews.status',
        'reviews.rating',
        'reviews.opinion',
        'reviews.is_favorite',
        'reviews.created_at',
        'reviews.updated_at'
      )

    const games = datas.map((data) => {
      const { id, mediaParentId, name, type, released, synopsis } = data
      const {
        filename,
        alternative,
        developer,
        publisher,
        platform,
        status,
        rating,
        opinion,
        is_favorite,
        created_at,
        updated_at,
      } = data.$extras
      return {
        game: {
          id,
          mediaParentId,
          name,
          type,
          released,
          synopsis,
          developer,
          publisher,
          platform,
        },
        cover: {
          filename,
          alternative,
        },
        review: {
          status,
          rating,
          opinion,
          is_favorite,
          createdAt: created_at,
          updatedAt: updated_at,
        },
      }
    })
    return response.status(201).json(games)
  }

  public async getOneGameByMediaId({ params, response }: HttpContextContract) {
    const mediaId = params.mediaId
    const datas = await Media.query()
      .from('medias')
      .join('games_infos', 'medias.id', '=', 'games_infos.media_id')
      .join('reviews', 'medias.id', '=', 'reviews.media_id')
      .join('covers', 'medias.id', '=', 'covers.media_id')
      .select(
        'medias.id',
        'medias.media_parent_id',
        'medias.name',
        'medias.type',
        'medias.released',
        'medias.synopsis',
        'covers.filename',
        'covers.alternative',
        'games_infos.developer',
        'games_infos.publisher',
        'games_infos.platform',
        'reviews.status',
        'reviews.rating',
        'reviews.opinion',
        'reviews.is_favorite',
        'reviews.created_at',
        'reviews.updated_at'
      )
      .where('medias.id', '=', mediaId)

    const noGameFound = datas.length === 0
    if (noGameFound) {
      return response.status(404).json("Aucun jeu correspondant n'a été trouvé")
    }
    const game = datas.map((data) => {
      const { id, mediaParentId, name, type, released, synopsis } = data
      const {
        filename,
        alternative,
        developer,
        publisher,
        platform,
        status,
        rating,
        opinion,
        is_favorite: isFavorite,
        created_at: createdAt,
        updated_at: updatedAt,
      } = data.$extras

      return {
        movie: {
          id,
          mediaParentId,
          name,
          type,
          released,
          synopsis,
          developer,
          publisher,
          platform,
        },
        cover: {
          filename,
          alternative,
        },
        review: {
          status,
          rating,
          opinion,
          isFavorite,
          createdAt,
          updatedAt,
        },
      }
    })
    return response.status(200).json(game)
  }
}
