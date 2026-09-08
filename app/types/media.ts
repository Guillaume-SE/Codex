export const MEDIA_CATEGORIES = ['game', 'book', 'anime', 'series', 'movie'] as const
export const CATEGORY_MATCH_REGEX = new RegExp(`^(${MEDIA_CATEGORIES.join('|')})$`)

export type MediaCategory = (typeof MEDIA_CATEGORIES)[number]
export type MediaProvider = 'tmdb' | 'jikan' | 'igdb' | 'hardcover'

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
  overview?: string
  genres: string[]
  status?: string
  // movie specific
  runtime?: number
  // series specific
  numberOfSeasons?: number
  numberOfEpisodes?: number
}

export interface MediaApiProvider {
  readonly providerName: string
  getRecentRelease(page?: number, options?: Record<string, any>): Promise<UnifiedMediaItem[]>
  getDetails(apiId: string, category: MediaCategory): Promise<UnifiedMediaDetail>
  // search(query: string, page?: number, options?: Record<string, any>): Promise<UnifiedMediaItem[]>
}
