import { MediaPresenterFactory } from '#classes/MediaPresenter'
import Cover from '#models/cover'
import CoverService from '#services/cover_service'
import MediaService from '#services/media_service'
import {
  deleteCoverValidator,
  manageCoverValidator,
  mediaCoverValidator,
} from '#validators/cover_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CoversController {
  constructor(
    readonly coverService: CoverService,
    readonly mediaService: MediaService
  ) {}

  async showManage({ request, inertia }: HttpContext) {
    const { params } = await request.validateUsing(mediaCoverValidator)
    const media = await this.mediaService.getOne(params.mediaId)
    const presentedMedia = MediaPresenterFactory.presentMedia(media)

    return inertia.render('admin/ManageCover', {
      media: presentedMedia,
    })
  }

  async manageOne({ params, request, response }: HttpContext) {
    const mediaId = params.mediaId

    const { cover } = await request.validateUsing(manageCoverValidator)
    const uploadedCover = await this.coverService.storeCover(cover)
    await this.coverService.saveStoredCoverFilenames(uploadedCover, mediaId)

    return response.redirect().toRoute('dashboard.home')
  }

  public async deleteOne({ request, params, response }: HttpContext) {
    const mediaId = params.mediaId

    await request.validateUsing(deleteCoverValidator)
    const cover = await Cover.findByOrFail('media_id', mediaId)

    await this.coverService.deleteCoverFile({
      original: cover.originalCoverFilename,
      small: cover.smallCoverFilename,
      medium: cover.mediumCoverFilename,
      large: cover.largeCoverFilename,
    })

    await cover.delete()

    return response.redirect().toRoute('dashboard.home')
  }
}
