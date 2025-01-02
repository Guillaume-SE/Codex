export interface IBaseMediaPresented {
  id: number
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

export interface IGameMediaPresented extends IBaseMediaPresented {
  gameInfos: {
    platform: string | null
  }
}

export interface IMovieMediaPresented extends IBaseMediaPresented {
  movieInfos: {
    duration: number | null
  }
}

export interface IBookMediaPresented extends IBaseMediaPresented {
  bookInfos: {
    pages: number | null
  }
}

export interface ISeriesMediaPresented extends IBaseMediaPresented {
  seriesInfos: {
    seasonLength: number | null
  }
}

export interface IAnimeMediaPresented extends IBaseMediaPresented {
  animeInfos: {
    seasonLength: number | null
  }
}