export type MediaCategory = 'game' | 'movie' | 'series' | 'anime' | 'book'
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

export interface MediaApiProvider {
  readonly providerName: string
  getRecentRelease(page?: number, options?: Record<string, any>): Promise<UnifiedMediaItem[]>
  // search(query: string, page?: number, options?: Record<string, any>): Promise<UnifiedMediaItem[]>
  // getById(apiId: string): Promise<UnifiedMediaItem | null>
}
