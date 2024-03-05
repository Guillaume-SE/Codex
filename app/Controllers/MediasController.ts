import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import Media from 'App/Models/Media'
import { defaultCoverFilename } from 'App/Tools/Functions/generateCoverName'
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
  // ADMIN
  public async deleteOneMedia({ params, response }: HttpContextContract) {
    const mediaId = params.id
    const media = await Media.find(mediaId)
    if (!media) {
      return response.status(404).json('Aucun media correspondant à cet id')
    }
    const coverToDelete = await Cover.findBy('media_id', mediaId)

    try {
      await media.delete()
      if (coverToDelete && coverToDelete.filename !== defaultCoverFilename) {
        await Drive.delete(`covers/${coverToDelete.filename}`)
      }
      return response.status(201).json(media)
    } catch (error) {
      return response.status(404)
    }
  }
}
