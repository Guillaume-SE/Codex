import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Media from 'App/Models/Media'
import Review from 'App/Models/Review'
import { validReviewStatus } from 'App/Tools/Enums/ReviewStatus'
import UpdateReviewValidator from 'App/Validators/UpdateReviewValidator'

export default class ReviewsController {
  public async getAllReviews({ response }: HttpContextContract) {
    const reviews = await Review.all()
    response.status(201)
    return reviews
  }

  public async updateOneReview({ request, params, response }: HttpContextContract) {
    const allValidReviewStatus = validReviewStatus
    const mediaId = params.mediaId

    const media = await Media.find(mediaId)
    if (!media) {
      return response.status(404).json("Aucun media n'a été trouvé")
    }

    const payloadValidation = await request.validate(UpdateReviewValidator)
    const asNoValidStatus = !allValidReviewStatus.includes(payloadValidation.status)

    if (asNoValidStatus) {
      return response.status(404).json({ message: "Le statut de la review n'est pas valide" })
    }

    const reviewUpdated = payloadValidation

    try {
      await media.related('review').updateOrCreate({}, reviewUpdated)
      return response.status(200).json(reviewUpdated)
    } catch (error) {
      return response.status(404).json(error)
    }
  }
}
