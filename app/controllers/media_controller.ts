import Media from '#models/media'
import CoverService from '#services/cover_service'
import MediaService from '#services/media_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MediasController {
  constructor(
    protected mediaService: MediaService,
    protected coverService: CoverService
  ) {}

  public async deleteOneMedia({ params, response }: HttpContext) {
    const mediaId = params.id

    try {
      await this.coverService.deleteOneCover(mediaId)
      await this.mediaService.deleteOneMedia(mediaId)
      return response.status(200)
    } catch (error) {
      return response.status(404).json(error)
    }
  }

  public async getAllMedia({ response }: HttpContext) {
    const medias = await Media.all()
    return response.status(201).json(medias)
  }

  public async getOneMediaById({ params, response }: HttpContext) {
    const mediaId = params.id
    try {
      const media = await this.mediaService.getOneMediaById(mediaId)
      return response.status(201).json(media)
    } catch (error) {
      return response.status(404).json(error)
    }
  }
}
