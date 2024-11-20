import type { IReviewPayload } from '#interfaces/review_interface'
import Media from '#models/media'
import { inject } from '@adonisjs/core'

@inject()
export default class ReviewsController {
  async storeOrUpdate(review: IReviewPayload, mediaId: number) {
    const media = await Media.findOrFail(mediaId)

    const searchPayload = { mediaId: media.id }
    await media.related('review').updateOrCreate(searchPayload, review)

    return review
  }
}
