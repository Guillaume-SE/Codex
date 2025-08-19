export interface IMediaPresented {
  id: number
  status: string
  category: string
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
