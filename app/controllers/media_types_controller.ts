import MediaType from '#models/media_type'
import MediaTypeService from '#services/media_type_service'
import {
  createMediaTypeValidator,
  replaceMediaTypeValidator,
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

  public async storeOrUpdate({ params, request, session, response }: HttpContext) {
    // for update
    if (params.typeId) {
      const data = await request.validateUsing(updateMediaTypeValidator, {
        meta: { params: params },
      })
      await this.mediaTypeService.storeOrUpdate(data, params.typeId)

      session.flash('success', `${data.name} ajouté avec succès`)

      return response.redirect().toRoute('type.manage')
    }
    // for create
    const data = await request.validateUsing(createMediaTypeValidator)
    await this.mediaTypeService.storeOrUpdate(data)

    session.flash('success', `${data.name} ajouté avec succès`)

    return response.redirect().toRoute('type.manage')
  }

  public async replaceOne({ request, params, session, response }: HttpContext) {
    const { replacementTypeId } = await request.validateUsing(replaceMediaTypeValidator)
    const typeDeleted = await this.mediaTypeService.replaceAndDelete(
      params.typeId,
      replacementTypeId
    )

    session.flash('success', `Remplacement effectué. ${typeDeleted} supprimé avec succès`)

    return response.redirect().toRoute('type.manage')
  }

  public async deleteOne({ params, session, response }: HttpContext) {
    const typeDeleted = await this.mediaTypeService.delete(params.typeId)

    session.flash('success', `${typeDeleted} supprimé avec succès`)

    return response.redirect().toRoute('type.manage')
  }
}
