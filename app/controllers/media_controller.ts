import Media from '#models/media'
import CoverService from '#services/cover_service'
import MediaService from '#services/media_service'
import { createMediaValidator } from '#validators/media_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MediasController {
  constructor(
    readonly mediaService: MediaService,
    readonly coverService: CoverService
  ) {}

  public async addOneMedia({ request, response }: HttpContext) {
    try {
      const payloadValidation = await request.validateUsing(createMediaValidator)
      const newMedia = await this.mediaService.addOneMedia(payloadValidation)
      return response.status(201).json(newMedia)
    } catch (error) {
      return response.status(400).json({ error })
    }
  }

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
