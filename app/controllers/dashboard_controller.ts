import { MediaPresenterFactory } from '#classes/MediaPresenter'
import MediaService from '#services/media_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class DashboardController {
  async showDashboard({ inertia }: HttpContext) {
    const mediaList = await MediaService.getAllPaginated()
    const paginatedMediaList = MediaPresenterFactory.presentMediaList(mediaList)

    return inertia.render('admin/Dashboard', {
      mediaList: paginatedMediaList,
    })
  }
}
