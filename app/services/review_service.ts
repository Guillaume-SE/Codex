import type { IReview } from '#interfaces/review_interface'
import Media from '#models/media'
import Review from '#models/review'
import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'

@inject()
export default class ReviewsController {
  async addOneReview(review: IReview, mediaId: number) {
    const media = await Media.find(mediaId)
    if (!media) {
      throw new Error("Le media n'existe pas")
    }
    const isAlreadyReviewed = await Review.findBy('mediaId', mediaId)
    if (isAlreadyReviewed) {
      throw new Error('Ce media possède déjà une critique')
    }

    await media.related('review').create(review)

    return review
  }

  async updateOneReview(datas: IReview, mediaId: number) {
    const media = await Media.findOrFail(mediaId)
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
