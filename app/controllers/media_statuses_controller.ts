import MediaStatusService from '#services/media_status_service'
import { manageMediaStatusValidator } from '#validators/media_status_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MediaCategoriesController {
  constructor(readonly mediaStatusService: MediaStatusService) {}

  public async addOneStatus({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(manageMediaStatusValidator)
      const status = await this.mediaStatusService.addOne(data)
      return response.status(201).json(status)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async updateOneStatus({ params, request, response }: HttpContext) {
    const statusId = params.statusId

    try {
      const data = await request.validateUsing(manageMediaStatusValidator)
      const status = await this.mediaStatusService.updateOne(data, statusId)
      return response.status(201).json(status)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async deleteOneStatus({ params, response }: HttpContext) {
    const statusId = params.statusId

    try {
      await this.mediaStatusService.deleteOne(statusId)
      return response.status(202)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }
}
