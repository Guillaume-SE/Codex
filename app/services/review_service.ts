import Media from '#models/media'
import { reviewValidator } from '#validators/review_validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type reviewData = Infer<typeof reviewValidator>

@inject()
export default class ReviewsController {
  async storeOrUpdate(review: reviewData, mediaId: number): Promise<string> {
    const media = await Media.findOrFail(mediaId)
    const searchPayload = { mediaId: media.id }

    await media.related('review').updateOrCreate(searchPayload, review)

    return media.name
  }
}
