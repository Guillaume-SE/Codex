export interface TmdbPaginatedResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface TmdbAlternativeTitle {
  iso_3166_1: string
  title: string
  type?: string
}

export interface TmdbAlternativeTitlesResponse {
  titles?: TmdbAlternativeTitle[] // Used by Movies
  results?: TmdbAlternativeTitle[] // Used by TV Series
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

export interface TmdbCastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export interface TmdbCreatedBy {
  id: number
  credit_id: string
  name: string
}

export interface TmdbCrewMember {
  id: number
  name: string
  job: string
}

export interface TmdbAggregateCastMember {
  id: number
  name: string
  roles?: {
    credit_id: string
    character: string
  }[]
  profile_path: string | null
  order: number
}

export interface TmdbAggregateCredits {
  cast: TmdbAggregateCastMember[]
}

export interface TmdbBelongsToCollection {
  id: number
  name: string
  poster_path?: string | null
}

export interface TmdbRawMovie {
  id: number
  title: string
  original_title?: string
  release_date?: string
  poster_path?: string | null
  vote_average?: number
  vote_count?: number
}

export interface TmdbRawSeries {
  id: number
  name: string
  original_name?: string
  first_air_date?: string
  poster_path?: string | null
  vote_average?: number
  vote_count?: number
}

export interface TmdbRawSeason {
  id: number
  name: string
  poster_path: string | null
  season_number: number
  episode_count: number
  air_date?: string | null
  vote_average?: number
  vote_count?: number
}

export interface TmdbRawCollectionDetail {
  id: number
  name: string
  poster_path: string | null
  parts: TmdbRawMovie[]
}

export interface TmdbRawBaseDetail {
  overview: string | null
  genres: { id: number; name: string }[]
  status: string
  origin_country: string[]
  alternative_titles?: TmdbAlternativeTitlesResponse
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[]
  production_companies: { id: number; name: string }[]
  videos?: TmdbVideoResults
  credits?: {
    crew: TmdbCrewMember[]
    cast: TmdbCastMember[]
  }
}

export interface TmdbRawMovieDetail extends TmdbRawMovie, TmdbRawBaseDetail {
  runtime: number | null
  budget: number
  revenue: number
  belongs_to_collection: TmdbBelongsToCollection | null
  recommendations?: TmdbPaginatedResponse<TmdbRawMovie>
}

export interface TmdbRawSeriesDetail extends TmdbRawSeries, TmdbRawBaseDetail {
  number_of_seasons: number
  number_of_episodes: number
  created_by?: TmdbCreatedBy[]
  aggregate_credits?: TmdbAggregateCredits
  seasons?: TmdbRawSeason[]
  recommendations?: TmdbPaginatedResponse<TmdbRawSeries>
}
