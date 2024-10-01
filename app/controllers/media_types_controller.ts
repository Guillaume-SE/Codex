import MediaTypeService from '#services/media_type_service'
import {
  createMediaTypeValidator,
  updateMediaTypeValidator,
} from '#validators/media_type_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MediaTypesController {
  constructor(readonly mediaTypeService: MediaTypeService) {}

  public async addOne({ request, response }: HttpContext) {
    try {
      const selectedCategoryId = request.body().categoryId
      const data = await request.validateUsing(createMediaTypeValidator, {
        meta: { categoryId: selectedCategoryId },
      })
      const type = await this.mediaTypeService.store(data)

      return response.status(201).json(type)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async updateOne({ params, request, response }: HttpContext) {
    const typeId = params.typeId
    try {
      const selectedCategoryId = request.body().categoryId
      const { params, ...data } = await request.validateUsing(updateMediaTypeValidator, {
        meta: { categoryId: selectedCategoryId },
      })
      const type = await this.mediaTypeService.update(data, typeId)

      return response.status(201).json(type)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }
}
