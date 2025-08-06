import { MediaPresenterFactory } from '#classes/MediaPresenter'
import Cover from '#models/cover'
import CoverService from '#services/cover_service'
import MediaService from '#services/media_service'
import { manageCoverValidator } from '#validators/cover_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CoversController {
  constructor(
    readonly coverService: CoverService,
    readonly mediaService: MediaService
  ) {}

  async showManage({ params, inertia }: HttpContext) {
    const media = await this.mediaService.getOne(params.mediaId)
    const presentedMedia = MediaPresenterFactory.presentMedia(media)

    return inertia.render('admin/ManageCover', {
      media: presentedMedia,
    })
  }

  async manageOne({ params, request, response }: HttpContext) {
    const mediaId = params.mediaId

    const { cover } = await request.validateUsing(manageCoverValidator)
    const uploadedCover = await this.coverService.store(cover)
    await this.coverService.saveStoredCoverFilenames(uploadedCover, mediaId)

    return response.redirect().toRoute('dashboard.home')
  }

  public async deleteOne({ params, response }: HttpContext) {
    const mediaId = params.mediaId

    const cover = await Cover.findByOrFail('media_id', mediaId)

    await this.coverService.deleteFile({
      original: cover.originalCoverFilename,
      small: cover.smallCoverFilename,
      medium: cover.mediumCoverFilename,
      large: cover.largeCoverFilename,
    })

    await cover.delete()

    return response.redirect().toRoute('dashboard.home')
  }
}
