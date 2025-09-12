import { CoverPresenter } from '#classes/CoverPresenter'
import { IPaginated } from '#interfaces/paginated_interface'
import type Media from '#models/media'
import type { MediaCategories } from '#types/MediaCategories'
import type { MediaStatuses } from '#types/MediaStatuses'
import { formatToDateMed, formatToRelative } from '#utils/formatDate'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'
import { DateTime } from 'luxon'

interface IGenre {
  id: number
  name: string
}

export class MediaPresenter {
  id: number
  status: MediaStatuses
  category: MediaCategories
  type: string
  name: string
  released: string | null
  synopsis: string | null
  addedOn: DateTime
  genres: string[]
  review?: {
    rating: number | null
    opinion: string | null
    isFavorite: boolean
    lastUpdate: string
  }
  cover?: {
    smallCoverUrl: string
    largeCoverUrl: string
  }
  gameInfos?: { platform: string | null }
  movieInfos?: { duration: number | null }
  animeInfos?: { seasonLength: number | null }
  seriesInfos?: { seasonLength: number | null }
  bookInfos?: { publisher: string | null }

  defaultCover: string

  constructor(media: Media) {
    this.id = media.id
    this.status = media.status.name
    this.category = media.category.name
    this.type = media.type.name
    this.name = media.name
    this.released = formatToDateMed(media.released)
    this.synopsis = media.synopsis
    this.addedOn = media.createdAt
    this.genres = media.genres.map((genre: IGenre) => genre.name)

    if (media.review) {
      this.review = {
        rating: media.review.rating,
        opinion: media.review.opinion,
        isFavorite: media.review.isFavorite,
        lastUpdate: formatToRelative(media.review.updatedAt),
      }
    }

    if (media.cover) {
      const coverPresenter = new CoverPresenter(media.cover)
      this.cover = {
        smallCoverUrl: coverPresenter.smallCoverUrl(),
        largeCoverUrl: coverPresenter.largeCoverUrl(),
      }
    }

    this.defaultCover = CoverPresenter.defaultCoverUrl()

    switch (media.category.name) {
      case 'game':
        this.gameInfos = { platform: media.gameInfo?.gamePlatform?.name ?? null }
        break
      case 'book':
        this.bookInfos = { publisher: media.bookInfo?.bookPublisher?.name ?? null }
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
