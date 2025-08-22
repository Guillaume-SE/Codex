import type { MediaCategories } from '#types/MediaCategories'
import type { MediaStatuses } from '#types/MediaStatuses'

export interface IMediaPresented {
  id: number
  status: MediaStatuses
  category: MediaCategories
  type: string
  name: string
  alternativeName: string | null
  released: string | null
  synopsis: string | null
  addedOn: string | null
  genres: string[]
  review?: {
    rating: number | null
    opinion: string | null
    isFavorite: boolean
    lastUpdate: string | null
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
}
