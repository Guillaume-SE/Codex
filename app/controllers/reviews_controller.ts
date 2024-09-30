import ReviewService from '#services/review_service'
import { manageReviewValidator } from '#validators/review_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ReviewsController {
  constructor(readonly reviewService: ReviewService) {}

  public async manageReview({ request, params, response }: HttpContext) {
    const mediaId = params.mediaId

    try {
      const { params, ...data } = await request.validateUsing(manageReviewValidator)
      const review = await this.reviewService.storeOrUpdate(data, mediaId)
      return response.status(201).json(review)
    } catch (error) {
      return response.status(404).json(error)
    }
  }
}
