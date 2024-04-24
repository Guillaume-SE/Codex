import Cover from '#models/cover'
import Media from '#models/media'
import type { HttpContext } from '@adonisjs/core/http'

export default class MediasController {
  public async getAllMedia({ response }: HttpContext) {
    const medias = await Media.all()
    return response.status(201).json(medias)
  }

  public async getOneMediaById({ params, response }: HttpContext) {
    const mediaId = params.id
    try {
      const media = await Media.findOrFail(mediaId)
      response.status(201)
      return media
    } catch (error) {
      return response.status(404).json(error)
    }
  }
  // ADMIN
  public async deleteOneMedia({ params, response }: HttpContext) {
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
      return response.status(404).json(error)
    }
  }
}
