export const MEDIA_CATEGORIES = ['game', 'book', 'anime', 'series', 'movie'] as const
export const CATEGORY_MATCH_REGEX = new RegExp(`^(${MEDIA_CATEGORIES.join('|')})$`)

export type MediaCategory = (typeof MEDIA_CATEGORIES)[number]
export type MediaProvider = 'tmdb' | 'jikan' | 'igdb' | 'hardcover'

export interface CastMember {
  id: number
  name: string
  character: string
  profileUrl?: string
}

export interface CrewMember {
  id: number
  name: string
  job: string
}

export interface SeasonItem {
  id: number
  name: string
  posterUrl?: string
  seasonNumber: number
  episodeCount: number
  airDate?: string
  rating?: number
}

export interface UnifiedMediaItem {
  apiId: string
  provider: MediaProvider
  category: MediaCategory
  title: string
  releaseDate?: string
  posterUrl?: string
  rating?: number
}

export interface UnifiedMediaDetail extends UnifiedMediaItem {
  originalTitle?: string
  frenchTitle?: string
  overview?: string
  genres: string[]
  status?: string
  trailerKey?: string
  originCountry?: string[]
  spokenLanguages?: string[]
  productionCompanies?: {
    id: number
    name: string
  }[]
  crew?: CrewMember[]
  cast?: CastMember[]
  recommendations?: UnifiedMediaItem[]
  runtime?: number
  budget?: number
  revenue?: number
  seasons?: SeasonItem[]
  belongsToCollection?: {
    id: number
    name: string
    posterUrl?: string
    parts?: UnifiedMediaItem[]
  }
  numberOfSeasons?: number
  numberOfEpisodes?: number
}

export interface MediaApiProvider {
  readonly providerName: string
  getRecentRelease(page?: number, options?: Record<string, any>): Promise<UnifiedMediaItem[]>
  getDetails(apiId: string, category: MediaCategory): Promise<UnifiedMediaDetail>
  // search(query: string, page?: number, options?: Record<string, any>): Promise<UnifiedMediaItem[]>
}
