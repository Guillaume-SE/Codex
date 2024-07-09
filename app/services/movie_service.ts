import Media from '#models/media'
import { inject } from '@adonisjs/core'

@inject()
export default class MovieService {
  async getAllMovies() {
    const datas = await Media.query()
      .from('media')
      .join('movies_infos', 'media.id', '=', 'movies_infos.media_id')
      .join('reviews', 'media.id', '=', 'reviews.media_id')
      .join('covers', 'media.id', '=', 'covers.media_id')
      .select(
        'media.id',
        'media.media_parent_id',
        'media.name',
        'media.type',
        'media.released',
        'media.synopsis',
        'covers.filename',
        'covers.filename_raw',
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
        filename_raw: filenameRaw,
        alternative,
        director,
        screenwriter,
        duration,
        status,
        rating,
        opinion,
        is_favorite: isFavorite,
        created_at: createdAt,
        updated_at: updatedAt,
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
          filenameRaw,
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
    return movies
  }

  async getOneMovieByMediaId(mediaId: number) {
    const datas = await Media.query()
      .from('media')
      .join('movies_infos', 'media.id', '=', 'movies_infos.media_id')
      .join('reviews', 'media.id', '=', 'reviews.media_id')
      .join('covers', 'media.id', '=', 'covers.media_id')
      .select(
        'media.id',
        'media.media_parent_id',
        'media.name',
        'media.type',
        'media.released',
        'media.synopsis',
        'covers.filename',
        'covers.filename_raw',
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
      .where('media.id', '=', mediaId)

    const noMovieFound = datas.length === 0
    if (noMovieFound) {
      throw new Error("Aucun film correspondant n'a été trouvé")
    }
    const movie = datas.map((data) => {
      const { id, mediaParentId, name, type, released, synopsis } = data
      const {
        filename,
        filename_raw: filenameRaw,
        alternative,
        director,
        screenwriter,
        duration,
        status,
        rating,
        opinion,
        is_favorite: isFavorite,
        created_at: createdAt,
        updated_at: updatedAt,
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
          filenameRaw,
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
    return movie
  }
}
