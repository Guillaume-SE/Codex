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

  public async addOneType({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createMediaTypeValidator)
      const type = await this.mediaTypeService.addOneType(data)
      return response.status(201).json(type)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async updateOneType({ params, request, response }: HttpContext) {
    const typeId = params.typeId
    try {
      const data = await request.validateUsing(updateMediaTypeValidator)
      const type = await this.mediaTypeService.updateOneType(data, typeId)
      return response.status(201).json(type)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async deleteOneType({ params, response }: HttpContext) {
    const typeId = params.typeId
    try {
      await this.mediaTypeService.deleteOneType(typeId)
      return response.status(202)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }
}
