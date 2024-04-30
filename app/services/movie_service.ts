import { createAlternativeText } from '#functions/create_cover_alt_text'
import { IMovie } from '#interfaces/media_interfaces'
import Media from '#models/media'
import MovieInfo from '#models/movie_info'
import CoverService from '#services/cover_service'
import MediaService from '#services/media_service'
import env from '#start/env'
import { inject } from '@adonisjs/core'

@inject()
export default class MovieService {
  constructor(
    protected mediaService: MediaService,
    protected coverService: CoverService
  ) {}
  protected defaultCoverFilename = env.get('DEFAULT_COVER_FILENAME')
  protected defaultCoverAltText = env.get('DEFAULT_COVER_ALT_TEXT')

  async addOneMovie(payload: IMovie) {
    const {
      mediaParentId,
      type,
      cover,
      name,
      released,
      synopsis,
      status,
      rating,
      opinion,
      isFavorite,
      ...specificMovieInfos
    } = payload

    await this.mediaService.isMediaAlreadyAdded(type, name, released)

    let coverName = this.defaultCoverFilename
    let coverAltText = this.defaultCoverAltText
    if (cover) {
      const newCover = await this.coverService.saveCover(type, name, cover.tmpPath)
      coverName = newCover.coverName
      coverAltText = newCover.coverAltText
    }

    const generalMediaInfos = { mediaParentId, type, name, released, synopsis }
    const coverInfo = { filename: coverName, alternative: coverAltText }
    const reviewInfo = { status, rating, opinion, isFavorite }

    const newMedia = await Media.create(generalMediaInfos)
    await newMedia.related('movieInfo').create(specificMovieInfos)
    await newMedia.related('cover').create(coverInfo)
    await newMedia.related('review').create(reviewInfo)

    return {
      media: generalMediaInfos,
      movie: specificMovieInfos,
      cover: coverInfo,
      review: reviewInfo,
    }
  }

  async updateOneMovie(payload: IMovie, mediaId: number) {
    const media = await this.mediaService.isMediaExist(mediaId)
    if (!media) {
      throw new Error('pas de media')
    }

    const cover = await this.coverService.isCoverExist(mediaId)
    if (!cover) {
      throw new Error('pas de cover')
    }
    const movie = await this.isMovieExist(mediaId)
    if (!movie) {
      throw new Error('pas de film')
    }
    const { mediaParentId, type, name, released, synopsis, ...specificMovieInfos } = payload
    const generalMediaInfos = { mediaParentId, type, name, released, synopsis }

    // update also the cover alt text
    const mediaNameAsChanged = media.name !== payload.name
    const isNotDefaultCover = cover.alternative !== this.defaultCoverAltText
    const newCoverAltText = createAlternativeText(type, name)

    media.merge(generalMediaInfos).save()
    movie.merge(specificMovieInfos).save()
    if (mediaNameAsChanged && isNotDefaultCover) {
      cover.merge({ alternative: newCoverAltText }).save()
    }

    return { media: generalMediaInfos, movie: specificMovieInfos, cover: newCoverAltText }
  }

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

  async isMovieExist(mediaId: number) {
    const movie = await MovieInfo.findBy('media_id', mediaId)
    return movie
  }
}
