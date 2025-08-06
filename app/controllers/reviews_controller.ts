import { MediaPresenterFactory } from '#classes/MediaPresenter'
import MediaService from '#services/media_service'
import ReviewService from '#services/review_service'
import { manageReviewValidator } from '#validators/review_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ReviewsController {
  constructor(
    readonly reviewService: ReviewService,
    readonly mediaService: MediaService
  ) {}

  async showManage({ params, inertia }: HttpContext) {
    const media = await this.mediaService.getOne(params.mediaId)
    const presentedMedia = MediaPresenterFactory.presentMedia(media)

    return inertia.render('admin/ManageReview', {
      media: presentedMedia,
    })
  }

  public async manageOne({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(manageReviewValidator)
    await this.reviewService.storeOrUpdate(data, params.mediaId)

    return response.redirect().toRoute('dashboard.home')
  }
}
