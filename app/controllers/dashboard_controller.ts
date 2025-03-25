import { MediaPresenterFactory } from '#classes/MediaPresenter'
import MediaService from '#services/media_service'
import { searchValidator } from '#validators/dashboard_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class DashboardController {
  async showDashboard({ inertia, request }: HttpContext) {
    const page = request.input('page')
    const filters = await request.validateUsing(searchValidator)
    const mediaList = await MediaService.getFiltered(filters, page)

    mediaList.baseUrl('/dashboard')

    const paginatedMediaList = MediaPresenterFactory.presentPaginatedMediaList(mediaList)

    return inertia.render('admin/Dashboard', {
      mediaList: paginatedMediaList,
    })
  }
}
