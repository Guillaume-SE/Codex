import { IGenre } from '#interfaces/genre_interface'
import { IMediaContributors } from '#interfaces/media_contributor_interface'
import Media from '#models/media'

abstract class BaseMediaFormatter {
  id: number
  mediaParentId: number | null
  status: string
  category: string
  type: string
  name: string
  alternativeName: string | null
  released: string | null
  synopsis: string | null
  genres: string[]
  contributors: Record<string, string[]>
  review?: {
    rating: number | null
    opinion: string | null
    isFavorite: boolean | null
    lastUpdate: number | null
  }
  cover?: { resized: string | null; original: string | null }

  constructor(media: any) {
    this.id = media.id
    this.mediaParentId = media.mediaParentId
    this.status = media.status.name
    this.category = media.category.name
    this.type = media.type.name
    this.name = media.name
    this.alternativeName = media.alternativeName
    this.released = media.released
    this.synopsis = media.synopsis
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
        resized: media.cover.resizedCoverFilename,
        original: media.cover.originalCoverFilename,
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

class BookMediaFormatter extends BaseMediaFormatter {
  bookInfos: { pages: number | null }

  constructor(media: any) {
    super(media)
    this.bookInfos = {
      pages: media.bookInfo?.pages ?? null,
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
      case 'Jeu vidéo':
        return new GameMediaFormatter(media)
      case 'Livre':
        return new BookMediaFormatter(media)
      case 'Film':
        return new MovieMediaFormatter(media)
      case 'Animé':
        return new AnimeMediaFormatter(media)
      case 'Série':
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
