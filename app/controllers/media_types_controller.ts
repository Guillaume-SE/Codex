import MediaType from '#models/media_type'
import MediaTypeService from '#services/media_type_service'
import {
  createMediaTypeValidator,
  replaceMediaTypeValidator,
  singleMediaTypeValidator,
  updateMediaTypeValidator,
} from '#validators/media_type_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

interface ITypeListFormatted {
  id: number
  name: string
  count: number
}

@inject()
export default class MediaTypesController {
  constructor(protected mediaTypeService: MediaTypeService) {}

  async showManage({ inertia }: HttpContext) {
    const typeList: MediaType[] = await MediaType.query().withCount('media').orderBy('name', 'asc')

    const typeListFormatted: ITypeListFormatted[] = typeList.map((type) => {
      return {
        id: type.id,
        name: type.name,
        count: type.$extras.media_count,
      }
    })

    return inertia.render('admin/ManageType', {
      typeList: typeListFormatted,
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

  public async replaceOne({ request, response }: HttpContext) {
    const { params, newTypeId } = await request.validateUsing(replaceMediaTypeValidator)
    await this.mediaTypeService.replaceAndDelete(params.typeId, newTypeId)

    return response.redirect().toRoute('type.manage')
  }

  public async deleteOne({ request, response }: HttpContext) {
    const { params } = await request.validateUsing(singleMediaTypeValidator)
    await this.mediaTypeService.delete(params.typeId)

    return response.redirect().toRoute('type.manage')
  }
}
