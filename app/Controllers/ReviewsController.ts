import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Review from 'App/Models/Review'

export default class ReviewsController {
  public async getAllReviews({ response }: HttpContextContract) {
    const reviews = await Review.all()
    response.status(201)
    return reviews
  }

  public async getOneReviewByMediaId({ params, response }: HttpContextContract) {
    const mediaId = params.id
    // try {
    //   const media = await Media.findOrFail(payload)
    //   response.status(201)
    //   return media
    // } catch (error) {
    //   return response.status(404).badRequest(error.message)
    // }
  }

  public async addOneReview({ request, response, params }: HttpContextContract) {
    const createdBy = 1
    const mediaId   = parseInt(params.mediaId)
    const { status, rating, notes, isFavorite } = request.body()
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
        message: 'Donnée concordante trouvée, review non ajoutée !!',
        actualReview: review,
      })
    }
    return response.status(200).json(review)
  }

  public async updateOneReview({ request, params, response }: HttpContextContract) {
    const mediaId = params.id
    const data    = request.body()
    // const review  = await Review.query().from('reviews').select('*').where('media_id', '=', mediaId)
    const review = await Review.findBy("mediaId", mediaId)
    if (!review) {
      return response.status(404).json('Aucun media ne correspond à cet id')
    }
    console.log(review.id)
    // try {
    //   await review.updateOrCreate({}, data).save()
    //   return response.status(201).json(review)
    // } catch (error) {
    //   return response.status(400).json(error)
    // }
  }

  public async deleteOneReview({ params, response }: HttpContextContract) {
    const mediaId = params.id
    const media   = await Review.find(mediaId)
    if (!media) {
      return response.status(404).json('Aucun media correspondant à cet id')
    }
    try {
      await media.delete()
      return response.status(201).json(media)
    } catch (error) {
      return response.status(404)
    }
  }
}
