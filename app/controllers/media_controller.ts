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

  async addOneMedia({ request, response }: HttpContext) {
    try {
      const selectedCategoryId = request.body().categoryId
      // meta needed to get data passed in the form and you them in queries
      const data = await request.validateUsing(createMediaValidator, {
        meta: { categoryId: selectedCategoryId },
      })
      const newMedia = await this.mediaService.addOneMedia(data)
      return response.status(201).json(newMedia)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  async updateOneMedia({ params, response, request }: HttpContext) {
    const mediaId = params.mediaId
    try {
      const selectedCategoryId = request.body().categoryId
      const { params, ...data } = await request.validateUsing(updateMediaValidator, {
        meta: { categoryId: selectedCategoryId },
      })
      const media = await this.mediaService.updateOneMedia(data, mediaId)

      return response.status(201).json(media)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  async deleteOneMedia({ request, params, response }: HttpContext) {
    const mediaId = params.mediaId

    try {
      await request.validateUsing(deleteMediaValidator)

      await this.mediaService.deleteOneMedia(mediaId)

      return response.status(200)
    } catch (error) {
      return response.status(404).json({ error, customError: error.message })
    }
  }

  public async show({ response }: HttpContext) {
    try {
      const mediaList = await this.mediaService.getMediaList()

      return response.status(201).json(mediaList)
    } catch (error) {
      return response.status(404).json({ error, customError: error.message })
    }
  }

  public async showOne({ request, params, response }: HttpContext) {
    const mediaId = params.mediaId

    try {
      await request.validateUsing(getMediaValidator)
      const media = await this.mediaService.getMedia(mediaId)

      return response.status(201).json(media)
    } catch (error) {
      return response.status(404).json({ error, customError: error.message })
    }
  }
}
