import Drive from '@ioc:Adonis/Core/Drive'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Media from 'App/Models/Media'
import { movieTypes } from 'App/Tools/Enums/MediaTypes'
import {
  createAlternativeText,
  defaultCoverAltText,
} from 'App/Tools/Functions/generateCoverAltText'
import { createFileName, defaultCoverFilename } from 'App/Tools/Functions/generateCoverName'
import { standardize } from 'App/Tools/Functions/standardizeCover'
import CreateMovieValidator from 'App/Validators/CreateMovieValidator'
import UpdateMovieValidator from 'App/Validators/UpdateMovieValidator'

export default class MoviesController {
  public async addOneMovie({ request, response }: HttpContextContract) {
    const payloadValidation = await request.validate(CreateMovieValidator)
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
      ...specificMovieInfos
    } = payloadValidation

    const searchIfMovieAlreadyExist = await Media.query()
      .from('medias')
      .where('type', type)
      .andWhere('name', name)
      .andWhere('released', released)
    const movieAlreadyExist = searchIfMovieAlreadyExist.length > 0

    if (movieAlreadyExist) {
      return response.status(400).json({
        message: 'Ce film a déjà été ajouté !',
        media: searchIfMovieAlreadyExist,
      })
    }
    const mediaIsMovieType = movieTypes.includes(type)
    if (!mediaIsMovieType) {
      return response.status(400).json({
        message: 'Le type du media ne correspond pas à la catégorie film',
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
      await newMedia.related('movieInfo').create(specificMovieInfos)
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

  public async updateOneMovie({ request, params, response }: HttpContextContract) {
    const mediaId = params.id
    const mediaToUpdate = await Media.find(mediaId)
    const mediaDoesntExist = !mediaToUpdate
    if (mediaDoesntExist) {
      return response.status(404).json('Aucun résultat pour cet identifiant')
    }

    const payloadValidation = await request.validate(UpdateMovieValidator)
    const { mediaParentId, type, name, released, synopsis, ...specificMovieInfos } =
      payloadValidation
    const generalMediaInfos = { mediaParentId, type, name, released, synopsis }

    const mediaIsMovieType = movieTypes.includes(type)
    if (!mediaIsMovieType) {
      return response.status(400).json({
        message: 'Le type ne correspond pas à la catégorie film',
      })
    }

    const trx = await Database.transaction()

    try {
      mediaToUpdate.merge(generalMediaInfos).save()
      await mediaToUpdate.related('movieInfo').updateOrCreate({}, specificMovieInfos)

      await trx.commit()
      return response.status(201).json(mediaToUpdate)
    } catch (error) {
      await trx.rollback()
      return response.status(400).json(error)
    }
  }

  public async getAllMovies({ response }: HttpContextContract) {
    const datas = await Media.query()
      .from('medias')
      .join('movies_infos', 'medias.id', '=', 'movies_infos.media_id')
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
        'movies_infos.director',
        'movies_infos.screenwriter',
        'movies_infos.duration',
        'reviews.status',
        'reviews.rating',
        'reviews.opinion',
        'reviews.is_favorite',
        'reviews.created_at',
        'reviews.updated_at'
      )
    const movies = datas.map((data) => {
      const { id, mediaParentId, name, type, released, synopsis } = data
      const {
        filename,
        alternative,
        director,
        screenwriter,
        duration,
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
          type,
          name,
          released,
          synopsis,
          director,
          screenwriter,
          duration,
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
    return response.status(201).json(movies)
  }

  public async getOneMovieByMediaId({ params, response }: HttpContextContract) {
    const mediaId = params.mediaId
    const datas = await Media.query()
      .from('medias')
      .join('movies_infos', 'medias.id', '=', 'movies_infos.media_id')
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
        'movies_infos.director',
        'movies_infos.screenwriter',
        'movies_infos.duration',
        'reviews.status',
        'reviews.rating',
        'reviews.opinion',
        'reviews.is_favorite',
        'reviews.created_at',
        'reviews.updated_at'
      )
      .where('medias.id', '=', mediaId)

    const noMovieFound = datas.length === 0
    if (noMovieFound) {
      return response.status(404).json("Aucun film correspondant n'a été trouvé")
    }
    const movie = datas.map((data) => {
      const { id, mediaParentId, name, type, released, synopsis } = data
      const {
        filename,
        alternative,
        director,
        screenwriter,
        duration,
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
          director,
          screenwriter,
          duration,
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
    return response.status(200).json(movie)
  }
}
