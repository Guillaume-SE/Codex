import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Media from 'App/Models/Media'

export default class MoviesController {
  public async getAllMoviesWithReviews({ response }: HttpContextContract) {
    const datas = await Media.query()
      .from('medias')
      .join('movies_infos', 'medias.id', '=', 'movies_infos.media_id')
      .join('reviews', 'medias.id', '=', 'reviews.media_id')
      .select(
        'medias.id',
        'medias.media_parent_id',
        'medias.name',
        'medias.type',
        'medias.cover',
        'medias.released',
        'medias.synopsis',
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

    const movies = datas.map((data) => {
      const { id, mediaParentId, name, type, cover, released, synopsis, createdAt, updatedAt } =
        data
      const { director, screenwriter, duration, status, rating, notes, is_favorite: isFavorite } = data.$extras

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
          isFavorite,
          createdAt,
          updatedAt,
        },
      }
    })
    return response.status(201).json(movies)
  }

  public async getOneMovieWithReviewById({ params, response }: HttpContextContract) {
    const mediaId = params.mediaId
    const datas = await Media.query()
      .from('medias')
      .join('movies_infos', 'medias.id', '=', 'movies_infos.media_id')
      .join('reviews', 'medias.id', '=', 'reviews.media_id')
      .select(
        'medias.id',
        'medias.media_parent_id',
        'medias.name',
        'medias.type',
        'medias.cover',
        'medias.released',
        'medias.synopsis',
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
      .where('medias.id', '=', mediaId)

    const noMovieFound = datas.length === 0
    if (noMovieFound) {
      return response.status(404).json("Aucun film correspondant n'a été trouvé")
    }
    const movie = datas.map((data) => {
      // createdAt et updatedAt sont celui de review ! 
      const { id, mediaParentId, name, type, cover, released, synopsis, createdAt, updatedAt } = data
      const { director, screenwriter, duration, status, rating, notes, is_favorite: isFavorite } = data.$extras

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
          isFavorite,
          createdAt,
          updatedAt,
        },
      }
    })
    return response.status(200).json(movie)
  }
}
