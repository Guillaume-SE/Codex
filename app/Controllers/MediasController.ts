import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Drive from '@ioc:Adonis/Core/Drive'
import Media from 'App/Models/Media'
import CreateMediaValidator from 'App/Validators/CreateMediaValidator'
import UpdateMediaValidator from 'App/Validators/UpdateMediaValidator'
import { gameTypes, movieTypes, seasonTypes, bookTypes } from 'App/Tools/Enums/MediaTypes'
import { createFileName, coverByDefaultFilename } from 'App/Tools/Functions/generateCoverName'
import { createAlternativeText } from 'App/Tools/Functions/generateCoverAltText'
import { standardize } from 'App/Tools/Functions/standardizeCover'
import Cover from 'App/Models/Cover'

export default class MediasController {
  public async getAllMedias({ response }: HttpContextContract) {
    const medias = await Media.all()
    return response.status(201).json(medias)
  }

  public async getOneMediaById({ params, response }: HttpContextContract) {
    const mediaId = params.id
    try {
      const media = await Media.findOrFail(mediaId)
      response.status(201)
      return media
    } catch (error) {
      return response.status(404).badRequest(error.message)
    }
  }

  //ADMIN
  public async addOneMedia({ request, response }: HttpContextContract) {
    const payloadValidation = await request.validate(CreateMediaValidator)
    const { mediaParentId, type, cover, name, released, synopsis, ...specificMediaInfos } =
      payloadValidation

    const searchIfMediaAlreadyExist = await Media.query()
      .from('medias')
      .where('type', type)
      .andWhere('name', name)
      .andWhere('released', released)
    const mediaAlreadyExist = searchIfMediaAlreadyExist.length > 0

    if (mediaAlreadyExist) {
      return response.status(400).json({
        message: 'Ce media a déjà été ajouté !',
        media: searchIfMediaAlreadyExist,
      })
    }

    // manage covers
    let coverName: string = 'default.png'
    let coverAltText: string = 'image non disponible'
    if (cover) {
      coverName = createFileName()
      coverAltText = createAlternativeText(type, name)
      const coverFormated = standardize(cover.tmpPath)
      await Drive.put(`covers/${coverName}`, await coverFormated, {
        contentType: `image/jpg`,
      })
    }

    const generalMediaInfo = { mediaParentId, type, name, released, synopsis }
    const coverInfo = { filename: coverName, alternative: coverAltText }

    const isVideoGameType = gameTypes.includes(type)
    const isMovieType = movieTypes.includes(type)
    const isBookType = bookTypes.includes(type)
    const isSeasonType = seasonTypes.includes(type)

    const trx = await Database.transaction()
    try {
      const newMedia = await Media.create(generalMediaInfo)
      await newMedia.related('cover').create(coverInfo)

      if (isVideoGameType) {
        await newMedia.related('gameInfo').create(specificMediaInfos)
      }

      if (isMovieType) {
        await newMedia.related('movieInfo').create(specificMediaInfos)
      }

      if (isBookType) {
        await newMedia.related('bookInfo').create(specificMediaInfos)
      }

      if (isSeasonType) {
        await newMedia.related('seasonInfo').create(specificMediaInfos)
      }

      await trx.commit()
      return response.status(201).json(newMedia)
    } catch (error) {
      await trx.rollback()
      if (coverName !== coverByDefaultFilename) {
        await Drive.delete(`covers/${coverName}`)
      }
      return response.status(400).json(error)
    }
  }

  // ADMIN
  public async updateOneMedia({ request, params, response }: HttpContextContract) {
    const mediaId = params.id
    const mediaToUpdate = await Media.find(mediaId)
    const mediaDoesntExist = !mediaToUpdate
    if (mediaDoesntExist) {
      return response.status(404).json("Le media à mettre à jour n'existe pas")
    }

    const payloadValidation = await request.validate(UpdateMediaValidator)
    const { mediaParentId, type, name, released, synopsis, ...specificMediaInfos } =
      payloadValidation
    const generalMediaInfo = { mediaParentId, type, name, released, synopsis }

    const isVideoGameType = gameTypes.includes(type)
    const isMovieType = movieTypes.includes(type)
    const isBookType = bookTypes.includes(type)
    const isSeasonType = seasonTypes.includes(type)

    const trx = await Database.transaction()

    try {
      mediaToUpdate.merge(generalMediaInfo).save()

      if (isVideoGameType) {
        await mediaToUpdate.related('gameInfo').updateOrCreate({}, specificMediaInfos)
      }

      if (isMovieType) {
        await mediaToUpdate.related('movieInfo').updateOrCreate({}, specificMediaInfos)
      }

      if (isBookType) {
        await mediaToUpdate.related('bookInfo').updateOrCreate({}, specificMediaInfos)
      }

      if (isSeasonType) {
        await mediaToUpdate.related('seasonInfo').updateOrCreate({}, specificMediaInfos)
      }

      await trx.commit()
      return response.status(201).json(mediaToUpdate)
    } catch (error) {
      await trx.rollback()
      return response.status(400).json(error)
    }
  }

  public async deleteOneMedia({ params, response }: HttpContextContract) {
    const mediaId = params.id
    const media = await Media.find(mediaId)
    if (!media) {
      return response.status(404).json('Aucun media correspondant à cet id')
    }
    const coverToDelete = await Cover.findBy('media_id', mediaId)

    try {
      await media.delete()
      if (coverToDelete && coverToDelete.filename !== coverByDefaultFilename) {
        await Drive.delete(`covers/${coverToDelete.filename}`)
      }
      return response.status(201).json(media)
    } catch (error) {
      return response.status(404)
    }
  }
}
