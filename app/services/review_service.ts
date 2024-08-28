import type { IReview } from '#interfaces/review_interface'
import Media from '#models/media'
import { inject } from '@adonisjs/core'

@inject()
export default class ReviewsController {
  async manageOneReview(review: IReview, mediaId: number) {
    const media = await Media.find(mediaId)
    if (!media) {
      throw new Error("Le media n'existe pas")
    }

    const searchPayload = { mediaId: media.id }
    await media.related('review').updateOrCreate(searchPayload, review)

    return review
  }
}
