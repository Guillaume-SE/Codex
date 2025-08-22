import { ListPresenter } from '#classes/ListPresenter'
import MediaType from '#models/media_type'
import MediaTypeService from '#services/media_type_service'
import { searchValidator } from '#validators/dashboard_validator'
import {
  createMediaTypeValidator,
  replaceMediaTypeValidator,
  updateMediaTypeValidator,
} from '#validators/media_type_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MediaTypesController {
  constructor(protected mediaTypeService: MediaTypeService) {}

  async showManage({ request, inertia }: HttpContext) {
    const page = request.input('page')
    const filters = await request.validateUsing(searchValidator)
    const typeList = await MediaTypeService.getFiltered(filters, page, 10)

    typeList.baseUrl('/admin/types/manage')

    const typeMapper = (type: MediaType) => {
      return {
        id: type.id,
        name: type.name,
        count: type.$extras.media_count,
      }
    }

    const listPresenter = new ListPresenter()
    const presentedTypeList = listPresenter.present(typeList, typeMapper)

    return inertia.render('admin/ManageType', {
      typeList: presentedTypeList,
    })
  }

  async store({ request, session, response }: HttpContext) {
    const data = await request.validateUsing(createMediaTypeValidator)
    await this.mediaTypeService.storeOrUpdate(data)

    session.flash('success', `${data.name} ajouté avec succès`)
    return response.redirect().toRoute('types.index')
  }

  async update({ params, request, session, response }: HttpContext) {
    const data = await request.validateUsing(updateMediaTypeValidator, {
      meta: { params: params },
    })
    await this.mediaTypeService.storeOrUpdate(data, params.typeId)

    session.flash('success', `${data.name} modifié avec succès`)
    return response.redirect().toRoute('types.index')
  }

  public async replaceOne({ request, params, session, response }: HttpContext) {
    const { replacementTypeId } = await request.validateUsing(replaceMediaTypeValidator)
    const typeDeleted = await this.mediaTypeService.replaceAndDelete(
      params.typeId,
      replacementTypeId
    )

    session.flash('success', `Remplacement effectué. ${typeDeleted} supprimé avec succès`)

    return response.redirect().toRoute('types.index')
  }

  public async destroy({ params, session, response }: HttpContext) {
    const typeDeleted = await this.mediaTypeService.delete(params.typeId)

    session.flash('success', `${typeDeleted} supprimé avec succès`)

    return response.redirect().toRoute('types.index')
  }
}
