import MediaService from '#services/media_service'
import {
  createMediaValidator,
  deleteMediaValidator,
  getMediaValidator,
  updateMediaValidator,
} from '#validators/media_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MediaController {
  constructor(readonly mediaService: MediaService) {}

  async addOne({ request, response }: HttpContext) {
    try {
      const selectedCategoryId = request.body().categoryId
      // meta used to pass data to use them in queries in validation process
      const data = await request.validateUsing(createMediaValidator, {
        meta: { categoryId: selectedCategoryId },
      })
      const newMedia = await this.mediaService.store(data)
      return response.status(201).json(newMedia)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  async updateOne({ params, response, request }: HttpContext) {
    const mediaId = params.mediaId
    try {
      const selectedCategoryId = request.body().categoryId
      const { params, ...data } = await request.validateUsing(updateMediaValidator, {
        meta: { categoryId: selectedCategoryId },
      })
      const media = await this.mediaService.update(data, mediaId)

      return response.status(201).json(media)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  async deleteOne({ request, params, response }: HttpContext) {
    const mediaId = params.mediaId

    try {
      await request.validateUsing(deleteMediaValidator)

      await this.mediaService.delete(mediaId)

      return response.status(200)
    } catch (error) {
      return response.status(404).json({ error, customError: error.message })
    }
  }

  public async show({ response }: HttpContext) {
    try {
      const mediaList = await this.mediaService.getAll()

      return response.status(201).json(mediaList)
    } catch (error) {
      return response.status(404).json({ error, customError: error.message })
    }
  }

  public async showOne({ inertia, request, params, response }: HttpContext) {
    const mediaId = params.mediaId

    try {
      await request.validateUsing(getMediaValidator)
      const media = await this.mediaService.getMedia(mediaId)

      return inertia.render('MediaProfile', { media })
    } catch (error) {
      return response.status(404).json({ error, customError: error.message })
    }
  }
}
