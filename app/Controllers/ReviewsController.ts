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
    const authorId = 1
    const mediaId = parseInt(params.mediaId)
    const { status, rating, notes, isFavorite } = request.body()
    const data = {
      createdBy: authorId,
      mediaId,
      status,
      rating,
      notes,
      isFavorite,
    }

    const trx = await Database.transaction()

    try {
      const review = await Review.create(data)
      await trx.commit()
      return response.status(200).json(review)
    } catch (error) {
      await trx.rollback()
      return response.status(400).json(error)
    }
  }
}
