export interface TmdbPaginatedResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
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
