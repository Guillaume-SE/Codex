import ReviewService from '#services/review_service'
import { createReviewValidator, updateReviewValidator } from '#validators/review_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ReviewsController {
  constructor(readonly reviewService: ReviewService) {}

  public async addOneReview({ params, response, request }: HttpContext) {
    const mediaId = params.mediaId

    try {
      const datas = await request.validateUsing(createReviewValidator)
      const newReview = await this.reviewService.addOneReview(datas, mediaId)
      return response.status(201).json(newReview)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async updateOneReview({ request, params, response }: HttpContext) {
    const mediaId = params.mediaId

    try {
      const payloadValidation = await request.validateUsing(updateReviewValidator)
      const review = await this.reviewService.updateOneReview(payloadValidation, mediaId)

      return response.status(201).json(review)
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ error })
      }
      return response.status(404).json(error)
    }
  }
}
