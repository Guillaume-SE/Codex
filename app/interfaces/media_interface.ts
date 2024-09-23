export interface IMediaPayload {
  mediaParentId: number | null
  statusId: number
  categoryId?: number
  typeId: number
  name: string
  alternativeName: string | null
  released: string | null
  synopsis: string | null
  genresIds?: Array<number>
  platformId?: number | null
  duration?: number | null
  seriesSeasonLength?: number | null
  animeSeasonLength?: number | null
  pages?: number | null
}

export interface IMedia {
  id: number
  mediaParentId: number | null
  status: string
  category: string
  type: string
  name: string
  alternativeName: string | null
  released: string | null
  synopsis: string | null
  genres: Array<string>
  contributors: Record<string, string[]>
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
