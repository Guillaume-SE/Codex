import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Media from 'App/Models/Media'
import Database from '@ioc:Adonis/Lucid/Database'
import CreateMediaValidator from 'App/Validators/CreateMediaValidator'
import {validMediaTypes, gameTypes, movieTypes, seasonTypes, bookTypes, MediaTypes } from 'App/Models/Enums/MediaTypes'

export default class MediasController {
  public async getAllMedias({ response }: HttpContextContract) {
    const medias = await Media.all()
    return response.status(201).json(medias)
  }

  public async getOneMediaById({ params, response }: HttpContextContract) {
    const payload = params.id
    try {
      const media = await Media.findOrFail(payload)
      response.status(201)
      return media
    } catch (error) {
      return response.status(404).badRequest(error.message)
    }
  }

  //ADMIN
  public async addOneMedia({ request, response }: HttpContextContract) {
    // const movieType = ['film']
    // const videoGameType = ['jeu vidéo', 'dlc']
    // const seasonType = ['series', 'animé', 'dessin animé', 'cartoon']
    // const bookType = ['manga', 'comics', 'roman', 'bande dessinée', 'artbook']
    // const allTypes = [...bookType, ...movieType, ...videoGameType, ...seasonType]
    // const { mediaParentId, type, cover, name, released, synopsis, ...specificMediaInfos } =
    //   request.body()
    const videoGameType = gameTypes
    const movieType = movieTypes
    const seasonType = seasonTypes
    const bookType = bookTypes
    const allTypes = validMediaTypes

    const payloadValidation = await request.validate(CreateMediaValidator)
    const { mediaParentId, type, cover, name, released, synopsis, ...specificMediaInfos } =
    payloadValidation
    const generalMediaInfo = { mediaParentId, type, cover, name, released, synopsis }

    const isVideoGameType = videoGameType.includes(type)
    const isMovieType = movieType.includes(type)
    const isBookType = bookType.includes(type)
    const isSeasonType = seasonType.includes(type)
    const asNoValidType = !allTypes.includes(type)

    if (asNoValidType) {
      return response.status(400).json("Le type de media n'est pas valide")
    }

    const trx = await Database.transaction()

    try {
      const media = await Media.create(generalMediaInfo)

      if (isVideoGameType) {
        await media.related('gameInfo').create(specificMediaInfos)
      }

      if (isMovieType) {
        await media.related('movieInfo').create(specificMediaInfos)
      }

      await trx.commit()
      return response.status(201).json(media)
    } catch (error) {
      await trx.rollback()
      return response.status(400).json(error)
    }
  }

  public async updateOneMedia({ request, params, response }: HttpContextContract) {
    const mediaId = params.id
    const checkIfMediaExist = await Media.find(mediaId)
    if (!checkIfMediaExist) {
      return response.status(404).json('Aucun media ne correspond à cet id')
    }

    const bookType = ['manga', 'comics', 'bande dessinée', 'artbook']
    const movieType = ['film']
    const videoGameType = ['jeu vidéo', 'dlc']
    const seasonType = ['series', 'animé', 'dessin animé', 'cartoon']
    const allTypes = [...bookType, ...movieType, ...videoGameType, ...seasonType]

    const { mediaParentId, type, cover, name, released, synopsis, ...specificMediaInfos } = request.body()
    const generalMediaInfo = { mediaParentId, type, cover, name, released, synopsis }

    const isVideoGameType = videoGameType.includes(type)
    const isBookType = bookType.includes(type)
    const isMovieType = movieType.includes(type)
    const isSeasonType = seasonType.includes(type)
    const asNoValidType = !allTypes.includes(type)

    if (asNoValidType) {
      return response.status(400).json("Le type de media n'est pas valide")
    }

    const trx = await Database.transaction()

    try {
      const media = await Media.updateOrCreate({} ,generalMediaInfo, { client: trx })

      if (isVideoGameType) {
        await media.related('gameInfo').updateOrCreate({} ,specificMediaInfos)
      }

      if (isMovieType) {
        await media.related('movieInfo').updateOrCreate({} ,specificMediaInfos)
      }

      await trx.commit()
      return response.status(201).json(media)
    } catch (error) {
      console.log(error)
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
    try {
      await media.delete()
      return response.status(201).json(media)
    } catch (error) {
      return response.status(404)
    }
  }
}
