import MediaType from '#models/media_type'
import MediaTypeService from '#services/media_type_service'
import {
  createMediaTypeValidator,
  updateMediaTypeValidator,
} from '#validators/media_type_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MediaTypesController {
  constructor(protected mediaTypeService: MediaTypeService) {}

  async showManage({ inertia }: HttpContext) {
    const typeList: MediaType[] = await MediaType.query().orderBy('name', 'asc')

    return inertia.render('admin/ManageType', {
      typeList,
    })
  }

  public async storeOrUpdate({ request, response }: HttpContext) {
    // for update
    if (request.params().typeId) {
      const { params, ...data } = await request.validateUsing(updateMediaTypeValidator)
      await this.mediaTypeService.storeOrUpdate(data, params.typeId)
      return response.redirect().toRoute('type.manage')
    }
    // for create
    const data = await request.validateUsing(createMediaTypeValidator)
    await this.mediaTypeService.storeOrUpdate(data)

    return response.redirect().toRoute('type.manage')
  }
}
