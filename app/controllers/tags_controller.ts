import Tag from '#models/tag'
import TagService from '#services/tag_service'
import { createTagValidator, tagValidator, updateTagValidator } from '#validators/tag_validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TagsController {
  constructor(readonly tagService: TagService) {}

  async showManage({ inertia }: HttpContext) {
    const tagList: Tag[] = await Tag.query().orderBy('name', 'asc')

    return inertia.render('admin/ManageTag', {
      tagList,
    })
  }

  public async storeOrUpdate({ request, response }: HttpContext) {
    // for update
    if (request.params().tagId) {
      const { params, ...data } = await request.validateUsing(updateTagValidator)
      await this.tagService.storeOrUpdate(data, params.tagId)
      return response.redirect().toRoute('tag.manage')
    }
    // for create
    const data = await request.validateUsing(createTagValidator)
    await this.tagService.storeOrUpdate(data)

    return response.redirect().toRoute('tag.manage')
  }

  public async deleteOne({ request, response }: HttpContext) {
    const { params } = await request.validateUsing(tagValidator)
    await this.tagService.delete(params.tagId)

    return response.redirect().toRoute('tag.manage')
  }
}
