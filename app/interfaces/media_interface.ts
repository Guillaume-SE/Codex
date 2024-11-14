import { DateTime } from 'luxon'

interface IBaseMedia {
  name: string
  alternativeName: string | null
  released: DateTime | null
  synopsis: string | null
}
export interface IMediaPayload extends IBaseMedia {
  statusId: number
  categoryId: number
  typeId: number
  tagId: number
  genreId: Array<number>
  platformId?: number | null
  duration?: number | null
  seriesSeasonLength?: number | null
  animeSeasonLength?: number | null
  pages?: number | null
}
export interface IMedia extends IBaseMedia {
  id: number
  status: string
  category: string
  type: string
  tag: string
  genres: Array<string>
  contributors: Record<string, string[]>
  gameInfos?: { platformId: number | null }
  bookInfos?: { pages: number | null }
  movieInfos?: { duration: number | null }
  animeInfos?: { seasonLength: number | null }
  seriesInfos?: { seasonLength: number | null }
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
