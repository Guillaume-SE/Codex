import { IGenre } from '#interfaces/genre_interface'
import { IPaginated } from '#interfaces/paginated_interface'
import Media from '#models/media'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'
import { DateTime } from 'luxon'

export abstract class BaseMediaPresenter {
  id: number
  status: string
  category: string
  type: string
  name: string
  alternativeName: string | null
  released: DateTime | null
  synopsis: string | null
  tag: string
  addedOn: string
  genres: string[]
  review?: {
    rating: number | null
    opinion: string | null
    isFavorite: boolean
    lastUpdate: string
  }
  cover?: {
    originalUrl: string
    smallUrl: string
    mediumUrl: string
    largeUrl: string
  }

  constructor(media: any) {
    this.id = media.id
    this.status = media.status.name
    this.category = media.category.name
    this.type = media.type.name
    this.name = media.name
    this.alternativeName = media.alternativeName
    this.released = media.released
    this.synopsis = media.synopsis
    this.tag = media.tag.name
    this.addedOn = media.created_at
    this.genres = media.genres.map((genre: IGenre) => genre.name)

    if (media.review) {
      this.review = {
        rating: media.review.rating,
        opinion: media.review.opinion,
        isFavorite: media.review.isFavorite,
        lastUpdate: media.review.updatedAt,
      }
    }

    if (media.cover) {
      this.cover = {
        originalUrl: media.cover.originalCoverUrl,
        smallUrl: media.cover.smallCoverUrl,
        mediumUrl: media.cover.mediumCoverUrl,
        largeUrl: media.cover.largeCoverUrl,
      }
    }
  }
}

class GameMediaPresenter extends BaseMediaPresenter {
  gameInfos: { platform: string | null }

  constructor(media: any) {
    super(media)
    this.gameInfos = {
      platform: media.gameInfo?.gamePlatform?.name ?? null,
    }
  }
}

class MovieMediaPresenter extends BaseMediaPresenter {
  movieInfos: { duration: number | null }

  constructor(media: any) {
    super(media)
    this.movieInfos = {
      duration: media.movieInfo?.duration ?? null,
    }
  }
}

class AnimeMediaPresenter extends BaseMediaPresenter {
  animeInfos: { seasonLength: number | null }

  constructor(media: any) {
    super(media)
    this.animeInfos = {
      seasonLength: media.animeInfo?.animeSeasonLength ?? null,
    }
  }
}

class SeriesMediaPresenter extends BaseMediaPresenter {
  seriesInfos: { seasonLength: number | null }

  constructor(media: any) {
    super(media)
    this.seriesInfos = {
      seasonLength: media.seriesInfo?.seriesSeasonLength ?? null,
    }
  }
}

class BookMediaPresenter extends BaseMediaPresenter {
  bookInfos: { pages: number | null }

  constructor(media: any) {
    super(media)
    this.bookInfos = {
      pages: media.bookInfo?.pages ?? null,
    }
  }
}

export class MediaPresenterFactory {
  static createPresenter(media: any): BaseMediaPresenter {
    switch (media.category.name) {
      case 'game':
        return new GameMediaPresenter(media)
      case 'book':
        return new BookMediaPresenter(media)
      case 'movie':
        return new MovieMediaPresenter(media)
      case 'anime':
        return new AnimeMediaPresenter(media)
      case 'series':
        return new SeriesMediaPresenter(media)
      default:
        throw new Error('Catégorie du media inconnue')
    }
  }

  static presentPaginatedMediaList(
    paginatorContract: ModelPaginatorContract<Media>
  ): IPaginated<BaseMediaPresenter> {
    return {
      meta: paginatorContract.getMeta(),
      data: paginatorContract.all().map((data) => this.createPresenter(data)),
    }
  }

  static presentMediaList(mediaList: Media[]): BaseMediaPresenter[] {
    return mediaList.map((data) => this.createPresenter(data))
  }

  static presentMedia(data: Media): BaseMediaPresenter {
    return this.createPresenter(data)
  }
}
