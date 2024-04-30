import { IReview } from '#interfaces/review_interfaces'
import Media from '#models/media'
import { default as Review, default as ReviewInfo } from '#models/review'
import MediaService from '#services/media_service'
import { createBookValidator, updateBookValidator } from '#validators/book_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ReviewsController {
  constructor(protected mediaService: MediaService) {}

  async updateOneReview(datas: IReview, mediaId: number) {
    const media = await this.mediaService.isMediaExist(mediaId)
    if (!media) {
      throw new Error('pas de media')
    }

    const review = await this.isReviewExist(mediaId)
    if (!review) {
      throw new Error('pas de review')
    }

    review.merge(datas).save()

    return review
  }

  async isReviewExist(mediaId: number) {
    const review = await ReviewInfo.findBy('media_id', mediaId)
    return review
  }
}
