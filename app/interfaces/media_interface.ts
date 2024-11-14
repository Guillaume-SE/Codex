import { DateTime } from 'luxon'

export interface IMediaPayload {
  statusId: number
  categoryId: number
  typeId: number
  name: string
  alternativeName: string | null
  released: DateTime | null
  synopsis: string | null
  tagId: number
  genreId: Array<number>
  platformId?: number | null
  duration?: number | null
  seriesSeasonLength?: number | null
  animeSeasonLength?: number | null
  pages?: number | null
}

export interface IMedia {
  id: number
  status: string
  category: string
  type: string
  name: string
  alternativeName: string | null
  released: DateTime | null
  synopsis: string | null
  tag: string
  genres: Array<string>
  contributors: Record<string, string[]>
  gameInfos?: {
    platformId: number | null
  }
  bookInfos?: {
    pages: number | null
  }
  movieInfos?: {
    duration: number | null
  }
  animeInfos?: {
    seasonLength: number | null
  }
  seriesInfos?: {
    seasonLength: number | null
  }
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
}
