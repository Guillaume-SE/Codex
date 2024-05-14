import { IReview } from '#interfaces/review_interface'
import Review from '#models/review'
import MediaService from '#services/media_service'
import { inject } from '@adonisjs/core'

@inject()
export default class ReviewsController {
  constructor(protected mediaService: MediaService) {}

  async updateOneReview(datas: IReview, mediaId: number) {
    const media = await this.mediaService.getOneMediaById(mediaId)
    if (!media) {
      throw new Error('pas de media')
    }

    const review = await this.getOneReviewByMediaId(mediaId)
    if (!review) {
      throw new Error('pas de review')
    }

    review.merge(datas).save()

    return review
  }

  async getOneReviewByMediaId(mediaId: number) {
    const review = await Review.findBy('media_id', mediaId)
    return review
  }
}
