import Media from '#models/media'
import { manageReviewValidator } from '#validators/review_validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type reviewData = Omit<Infer<typeof manageReviewValidator>, 'params'>

@inject()
export default class ReviewsController {
  async storeOrUpdate(review: reviewData, mediaId: number) {
    const media = await Media.findOrFail(mediaId)
    const searchPayload = { mediaId: media.id }

    await media.related('review').updateOrCreate(searchPayload, review)
  }
}
