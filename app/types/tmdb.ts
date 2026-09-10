export interface TmdbPaginatedResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface TmdbVideo {
  id: string
  key: string
  name: string
  site: string
  type: string
  official: boolean
}

export interface TmdbVideoResults {
  results: TmdbVideo[]
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

export interface TmdbRawBaseDetail {
  overview: string | null
  genres: { id: number; name: string }[]
  status: string
  origin_country: string[]
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[]
  production_companies: { id: number; name: string }[]
  videos?: TmdbVideoResults
}

export interface TmdbRawMovieDetail extends TmdbRawMovie, TmdbRawBaseDetail {
  runtime: number | null
  budget: number
  revenue: number
  belongs_to_collection: {
    id: number
    name: string
  } | null
}

export interface TmdbRawSeriesDetail extends TmdbRawSeries, TmdbRawBaseDetail {
  number_of_seasons: number
  number_of_episodes: number
}
