import type { IAccumulator } from '#interfaces/accumulator_interface'
import type { IGenre } from '#interfaces/genre_interface'
import type { IMediaContributors } from '#interfaces/media_contributor_interface'
import type { IMedia } from '#interfaces/media_interface'

export class MediaFormatter {
  id: number
  mediaParentId: number | null
  status: string
  category: string
  type: string
  name: string
  alternativeName: string | null
  released: string | null
  synopsis: string | null
  genres?: string[] | undefined
  contributors?: Record<string, string[]>
  gameInfos?: { platform: string | null }
  bookInfos?: { pages: number | null }
  movieInfos?: { duration: number | null }
  animeInfos?: { seasonLength: number | null }
  seriesInfos?: { seasonLength: number | null }
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
    this.status = media.mediaStatus.name
    this.category = media.mediaCategory.name
    this.type = media.mediaType.name
    this.name = media.name
    this.alternativeName = media.alternativeName || null
    this.released = media.released || null
    this.synopsis = media.synopsis || null
    this.genres = media.genres.map((genre: IGenre) => genre.name)
    this.contributors = this.formatContributors(media.mediaProject)
    this.gameInfos = {
      platform: media.gameInfo ? media.gameInfo.gamePlatform.name : null,
    }
    this.bookInfos = {
      pages: media.bookInfo ? media.bookInfo.pages : null,
    }
    this.movieInfos = {
      duration: media.movieInfo ? media.movieInfo.duration : null,
    }
    this.animeInfos = {
      seasonLength: media.animeInfo ? media.animeInfo.animeSeasonLength : null,
    }
    this.seriesInfos = {
      seasonLength: media.seriesInfo ? media.seriesInfo.seriesSeasonLength : null,
    }
    this.review = {
      rating: media.review ? media.review.rating : null,
      opinion: media.review ? media.review.opinion : null,
      isFavorite: media.review ? media.review.isFavorite : null,
      lastUpdate: media.review ? media.review.updatedAt : null,
    }
    this.cover = {
      resized: media.cover ? media.cover.resizedCoverFilename : null,
      original: media.cover ? media.cover.originalCoverFilename : null,
    }
  }

  formatContributors(mediaProjects: IMediaContributors[]): IAccumulator {
    return mediaProjects.reduce((acc: IAccumulator, project: IMediaContributors) => {
      const jobName = project.job?.name
      if (jobName) {
        if (!acc[jobName]) {
          acc[jobName] = []
        }
        const contributorName = project.contributor?.name
        if (contributorName) {
          acc[jobName].push(contributorName)
        }
      }
      return acc
    }, {} as IAccumulator)
  }

  static formatMediaList(mediaList: IMedia[]): MediaFormatter[] {
    return mediaList.map((media) => new MediaFormatter(media))
  }
}
