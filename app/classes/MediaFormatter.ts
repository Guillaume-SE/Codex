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
  genres: string[]
  contributors: Record<string, string[]>
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
    this.alternativeName = media.alternativeName
    this.released = media.released
    this.synopsis = media.synopsis
    this.genres = media.genres.map((genre: IGenre) => genre.name)
    this.contributors = this.formatContributors(media.mediaProject)
    if (media.gameInfo) {
      this.gameInfos = {
        platform: media.gameInfo.gamePlatform?.name ?? null,
      }
    }
    if (media.bookInfo) {
      this.bookInfos = {
        pages: media.bookInfo?.pages ?? null,
      }
    }
    if (media.movieInfo) {
      this.movieInfos = {
        duration: media.movieInfo.duration ?? null,
      }
    }
    if (media.animeInfo) {
      this.animeInfos = {
        seasonLength: media.animeInfo.animeSeasonLength ?? null,
      }
    }
    if (media.seriesInfo) {
      this.seriesInfos = {
        seasonLength: media.seriesInfo.seriesSeasonLength ?? null,
      }
    }
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

  static formatMedia(media: IMedia): MediaFormatter {
    return new MediaFormatter(media)
  }
}
