import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Media from 'App/Models/Media'

export default class MoviesController {
  public async getAllMoviesWithReviews({ response }: HttpContextContract) {
    const datas = await Media.query()
      .from('medias')
      .join('movies_infos', 'medias.id', '=', 'movies_infos.media_id')
      .join('reviews', 'medias.id', '=', 'reviews.media_id')
      .select(
        'medias.*',
        'movies_infos.director',
        'movies_infos.screenwriter',
        'movies_infos.duration',
        'reviews.status',
        'reviews.rating',
        'reviews.notes',
        'reviews.is_favorite',
        'reviews.created_at',
        'reviews.updated_at'
      )
    // .toQuery()
    // console.log(datas)

    const movies = datas.map((data) => {
    const { id, mediaParentId, name, type, cover, released, synopsis } = data
    const { director, screenwriter, duration, status, rating, notes, is_favorite } = data.$extras
      return {
        movie: {
          id,
          mediaParentId,
          name,
          type,
          cover,
          released,
          synopsis,
          director,
          screenwriter,
          duration,
        },
        review: {
          status,
          rating,
          notes,
          is_favorite,
        },
      }
    })
    return response.status(201).json(movies)
  }
}
