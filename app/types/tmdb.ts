export interface TmdbPaginatedResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface TmdbGenre {
  id: number
  name: string
}

export interface TmdbRawMovie {
  id: number
  title: string
  release_date?: string
  poster_path?: string | null
  vote_average?: number
}

export interface TmdbRawSeries {
  id: number
  name: string
  first_air_date?: string
  poster_path?: string | null
  vote_average?: number
}

export interface TmdbRawMovieDetail extends TmdbRawMovie {
  overview?: string
  genres?: TmdbGenre[]
  runtime?: number | null
  status?: string
}

export interface TmdbRawSeriesDetail extends TmdbRawSeries {
  overview?: string
  genres?: TmdbGenre[]
  number_of_seasons?: number
  number_of_episodes?: number
  status?: string
}
