import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Media from 'App/Models/Media'

export default class MoviesController {
  public async getAllMoviesWithReviews({ response }: HttpContextContract) {
    const datas = await Media.query()
      .from('medias')
      .join('movies_infos', 'medias.id', '=', 'movies_infos.media_id')
      .join('reviews', 'medias.id', '=', 'reviews.media_id')
      .join('covers', 'medias.id', '=', 'covers.media_id')
      .select(
        'medias.id',
        'medias.media_parent_id',
        'medias.name',
        'medias.type',
        'medias.released',
        'medias.synopsis',
        'covers.filename',
        'covers.alternative',
        'movies_infos.director',
        'movies_infos.screenwriter',
        'movies_infos.duration',
        'reviews.status',
        'reviews.rating',
        'reviews.opinion',
        'reviews.is_favorite',
        'reviews.created_at',
        'reviews.updated_at'
      )
    const movies = datas.map((data) => {
      const { id, mediaParentId, name, type, released, synopsis } = data
      const {
        filename,
        alternative,
        director,
        screenwriter,
        duration,
        status,
        rating,
        opinion,
        is_favorite,
        created_at,
        updated_at,
      } = data.$extras

      return {
        movie: {
          id,
          mediaParentId,
          type,
          name,
          released,
          synopsis,
          director,
          screenwriter,
          duration,
        },
        cover: {
          filename,
          alternative,
        },
        review: {
          status,
          rating,
          opinion,
          isFavorite: is_favorite,
          createdAt: created_at,
          updatedAt: updated_at,
        },
      }
    })
    return response.status(201).json(movies)
  }

  public async getOneMovieWithReviewByMediaId({ params, response }: HttpContextContract) {
    const mediaId = params.mediaId
    const datas = await Media.query()
      .from('medias')
      .join('movies_infos', 'medias.id', '=', 'movies_infos.media_id')
      .join('reviews', 'medias.id', '=', 'reviews.media_id')
      .join('covers', 'medias.id', '=', 'covers.media_id')
      .select(
        'medias.id',
        'medias.media_parent_id',
        'medias.name',
        'medias.type',
        'medias.released',
        'medias.synopsis',
        'covers.filename',
        'covers.alternative',
        'movies_infos.director',
        'movies_infos.screenwriter',
        'movies_infos.duration',
        'reviews.status',
        'reviews.rating',
        'reviews.opinion',
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
      const { id, mediaParentId, name, type, released, synopsis } = data
      const {
        filename,
        alternative,
        director,
        screenwriter,
        duration,
        status,
        rating,
        opinion,
        is_favorite: isFavorite,
        createdAt,
        updatedAt,
      } = data.$extras

      return {
        movie: {
          id,
          mediaParentId,
          name,
          type,
          released,
          synopsis,
          director,
          screenwriter,
          duration,
        },
        cover: {
          filename,
          alternative,
        },
        review: {
          status,
          rating,
          opinion,
          isFavorite,
          createdAt,
          updatedAt,
        },
      }
    })
    return response.status(200).json(movie)
  }
}
