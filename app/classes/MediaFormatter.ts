import { IGenre } from '#interfaces/genre_interface'
import { IMediaContributors } from '#interfaces/media_contributor_interface'
import Media from '#models/media'

abstract class BaseMediaFormatter {
  id: number
  status: string
  category: string
  type: string
  name: string
  alternativeName: string | null
  released: string | null
  synopsis: string | null
  tag: string
  genres: string[]
  contributors: Record<string, string[]>
  review?: {
    rating: number | null
    opinion: string | null
    isFavorite: boolean
    lastUpdate: number
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
    this.genres = media.genres.map((genre: IGenre) => genre.name)
    this.contributors = this.formatContributors(media.contributors)

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

  protected formatContributors(mediaContributors: IMediaContributors[]): Record<string, string[]> {
    return mediaContributors.reduce(
      (acc: Record<string, string[]>, mediaContributor: IMediaContributors) => {
        const roleName = mediaContributor.role?.name
        if (roleName) {
          if (!acc[roleName]) {
            acc[roleName] = []
          }
          const contributorName = mediaContributor.contributor?.name
          if (contributorName) {
            acc[roleName].push(contributorName)
          }
        }
        return acc
      },
      {}
    )
  }
}

// Specific media type formatters
class GameMediaFormatter extends BaseMediaFormatter {
  gameInfos: { platform: string | null }

  constructor(media: any) {
    super(media)
    this.gameInfos = {
      platform: media.gameInfo?.gamePlatform?.name ?? null,
    }
  }
}

class MovieMediaFormatter extends BaseMediaFormatter {
  movieInfos: { duration: number | null }

  constructor(media: any) {
    super(media)
    this.movieInfos = {
      duration: media.movieInfo?.duration ?? null,
    }
  }
}

class BookMediaFormatter extends BaseMediaFormatter {
  bookInfos: { pages: number | null }

  constructor(media: any) {
    super(media)
    this.bookInfos = {
      pages: media.bookInfo?.pages ?? null,
    }
  }
}

class AnimeMediaFormatter extends BaseMediaFormatter {
  animeInfos: { seasonLength: number | null }

  constructor(media: any) {
    super(media)
    this.animeInfos = {
      seasonLength: media.animeInfo?.animeSeasonLength ?? null,
    }
  }
}

class SeriesMediaFormatter extends BaseMediaFormatter {
  seriesInfos: { seasonLength: number | null }

  constructor(media: any) {
    super(media)
    this.seriesInfos = {
      seasonLength: media.seriesInfo?.seriesSeasonLength ?? null,
    }
  }
}

export class MediaFormatterFactory {
  static createFormatter(media: any): BaseMediaFormatter {
    switch (media.category.name) {
      case 'game':
        return new GameMediaFormatter(media)
      case 'book':
        return new BookMediaFormatter(media)
      case 'movie':
        return new MovieMediaFormatter(media)
      case 'anime':
        return new AnimeMediaFormatter(media)
      case 'series':
        return new SeriesMediaFormatter(media)
      default:
        throw new Error('Catégorie du média inconnue')
    }
  }

  static formatMediaList(mediaList: Media[]): BaseMediaFormatter[] {
    return mediaList.map((media) => this.createFormatter(media))
  }

  static formatMedia(media: Media): BaseMediaFormatter {
    return this.createFormatter(media)
  }
}
