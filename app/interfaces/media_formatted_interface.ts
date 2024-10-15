export interface IBaseMediaFormatted {
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

export interface IGameMediaFormatted extends IBaseMediaFormatted {
  gameInfos: {
    platform: string | null
  }
}

export interface IMovieMediaFormatted extends IBaseMediaFormatted {
  movieInfos: {
    duration: number | null
  }
}

export interface IBookMediaFormatted extends IBaseMediaFormatted {
  bookInfos: {
    pages: number | null
  }
}

export interface ISeriesMediaFormatted extends IBaseMediaFormatted {
  seriesInfos: {
    seasonLength: number | null
  }
}

export interface IAnimeMediaFormatted extends IBaseMediaFormatted {
  animeInfos: {
    seasonLength: number | null
  }
}
