import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Media from 'App/Models/Media'
import Review from 'App/Models/Review'
import { validReviewStatus } from 'App/Models/Enums/ReviewStatus'

export default class ReviewsController {
  public async getAllReviews({ response }: HttpContextContract) {
    const reviews = await Review.all()
    response.status(201)
    return reviews
  }

  public async addOneReview({ request, response, params }: HttpContextContract) {
    const reviewStatus = validReviewStatus
    const createdBy = 1
    const mediaId = parseInt(params.mediaId)
    const { status, rating, notes, isFavorite } = request.body()
    const asNoValidStatus = !reviewStatus.includes(status)

    if (asNoValidStatus) {
      return response.status(404).json({ message: "Le statut de la review n'est pas valide" })
    }
    const data = {
      createdBy,
      mediaId,
      status,
      rating,
      notes,
      isFavorite,
    }

    const review = await Review.firstOrCreate({ mediaId: mediaId }, data)
    const isAlreadyReviewed = !review.$isLocal
    if (isAlreadyReviewed) {
      return response.status(400).json({
        message: 'Ce media à déjà une review !',
        actualReview: review,
      })
    }
    return response.status(200).json(review)
  }

  public async updateOneReview({ request, params, response }: HttpContextContract) {
    const mediaId = params.mediaId
    const updatedReview = request.body()
    const media = await Media.find(mediaId)
    if (!media) {
      return response.status(404).json("Aucun media n'a été trouvé")
    }
    try {
      await media.related('review').updateOrCreate({}, updatedReview)
      return response.status(200).json(updatedReview)
    } catch (error) {
      return response.status(404).json(error)
    }
  }
}
