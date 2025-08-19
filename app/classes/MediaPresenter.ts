import { IPaginated } from '#interfaces/paginated_interface'
import type Media from '#models/media'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'
import { DateTime } from 'luxon'

interface IGenre {
  id: number
  name: string
}

export class MediaPresenter {
  id: number
  status: string
  category: string
  type: string
  name: string
  alternativeName: string | null
  released: DateTime | null
  synopsis: string | null
  addedOn: DateTime
  genres: string[]
  review?: {
    rating: number | null
    opinion: string | null
    isFavorite: boolean
    lastUpdate: DateTime
  }
  cover?: {
    originalUrl: string
    smallUrl: string
    mediumUrl: string
    largeUrl: string
  }
  gameInfos?: { platform: string | null }
  movieInfos?: { duration: number | null }
  animeInfos?: { seasonLength: number | null }
  seriesInfos?: { seasonLength: number | null }
  bookInfos?: { pages: number | null }

  constructor(media: Media) {
    this.id = media.id
    this.status = media.status.name
    this.category = media.category.name
    this.type = media.type.name
    this.name = media.name
    this.alternativeName = media.alternativeName
    this.released = media.released
    this.synopsis = media.synopsis
    this.addedOn = media.createdAt
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

    switch (media.category.name) {
      case 'game':
        this.gameInfos = { platform: media.gameInfo?.gamePlatform?.name ?? null }
        break
      case 'book':
        this.bookInfos = { pages: media.bookInfo?.pages ?? null }
        break
      case 'movie':
        this.movieInfos = { duration: media.movieInfo?.duration ?? null }
        break
      case 'anime':
        this.animeInfos = { seasonLength: media.animeInfo?.animeSeasonLength ?? null }
        break
      case 'series':
        this.seriesInfos = { seasonLength: media.seriesInfo?.seriesSeasonLength ?? null }
        break
    }
  }

  static present(media: Media): MediaPresenter {
    return new MediaPresenter(media)
  }

  static presentMany(mediaList: Media[]): MediaPresenter[] {
    return mediaList.map((media) => new MediaPresenter(media))
  }

  static presentPaginated(paginator: ModelPaginatorContract<Media>): IPaginated<MediaPresenter> {
    const presentedData = paginator.all().map((media) => new MediaPresenter(media))
    return {
      meta: paginator.getMeta(),
      data: presentedData,
    }
  }
}
