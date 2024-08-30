import MediaCategoryService from '#services/media_category_service'
import { manageMediaCategoryValidator } from '#validators/media_category_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MediaCategoriesController {
  constructor(readonly mediaCategoryService: MediaCategoryService) {}

  public async addOneCategory({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(manageMediaCategoryValidator)
      const category = await this.mediaCategoryService.addOne(data)
      return response.status(201).json(category)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async updateOneCategory({ params, request, response }: HttpContext) {
    const categoryId = params.categoryId

    try {
      const data = await request.validateUsing(manageMediaCategoryValidator)
      const category = await this.mediaCategoryService.updateOne(data, categoryId)
      return response.status(201).json(category)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async deleteOneCategory({ params, response }: HttpContext) {
    const categoryId = params.categoryId

    try {
      await this.mediaCategoryService.deleteOne(categoryId)
      return response.status(202)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }
}