import { MediaPresenter } from '#classes/MediaPresenter'
import MediaService from '#services/media_service'
import ReviewService from '#services/review_service'
import { reviewValidator } from '#validators/review_validator'
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
    const presentedMedia = MediaPresenter.present(media)

    return inertia.render('admin/ManageReview', {
      media: presentedMedia,
    })
  }

  async store({ request, params, session, response }: HttpContext) {
    const data = await request.validateUsing(reviewValidator)
    const mediaReviewed = await this.reviewService.storeOrUpdate(data, params.mediaId)

    session.flash('success', `Review de ${mediaReviewed} ajoutée avec succès`)
    return response.redirect().toRoute('dashboard.home')
  }

  async update({ params, request, session, response }: HttpContext) {
    const data = await request.validateUsing(reviewValidator)
    const mediaReviewed = await this.reviewService.storeOrUpdate(data, params.mediaId)

    session.flash('success', `Review de ${mediaReviewed} modifiée avec succès`)
    return response.redirect().toRoute('dashboard.home')
  }
}
