import TagService from '#services/tag_service'
import {
  createTagValidator,
  deleteTagValidator,
  updateTagValidator,
} from '#validators/tag_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TagsController {
  constructor(readonly tagService: TagService) {}

  public async addOne({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createTagValidator)
      const tag = await this.tagService.store(data)

      return response.status(201).json(tag)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async updateOne({ params, request, response }: HttpContext) {
    const tagId = params.tagId
    try {
      const { params, ...data } = await request.validateUsing(updateTagValidator)
      const tag = await this.tagService.update(data, tagId)

      return response.status(201).json(tag)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async deleteOne({ request, params, response }: HttpContext) {
    const tagId = params.tagId

    try {
      await request.validateUsing(deleteTagValidator)

      await this.tagService.delete(tagId)

      return response.status(202)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }
}
