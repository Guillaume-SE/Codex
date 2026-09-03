import { TmdbMapper } from '#mappers/tmdb_mapper'
import env from '#start/env'
import type { MediaApiProvider, UnifiedMediaItem } from '#types/media'
import type { TmdbPaginatedResponse, TmdbRawMovie, TmdbRawSeries } from '#types/tmdb'

export interface TmdbOptions {
  region?: string
  category?: 'movie' | 'series'
}

export class TmdbService implements MediaApiProvider {
  readonly providerName = 'tmdb'
  private baseUrl = 'https://api.themoviedb.org/3'

  private async request<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${env.get('TMDB_READ_TOKEN')}`,
      },
    })

    if (!response.ok) {
      throw new Error(`TMDB API Error [${response.status}]`)
    }

    return response.json() as Promise<T>
  }

  async getRecentRelease(page = 1, options?: TmdbOptions): Promise<UnifiedMediaItem[]> {
    const params = new URLSearchParams({ page: String(page) })
    if (options?.region) {
      params.append('region', options.region)
    }

    const isSeries = options?.category === 'series'
    const endpoint = isSeries ? `/tv/on_the_air?${params}` : `/movie/now_playing?${params}`

    if (isSeries) {
      const data = await this.request<TmdbPaginatedResponse<TmdbRawSeries>>(endpoint)
      return data.results.map(TmdbMapper.toUnifiedSeries)
    }

    const data = await this.request<TmdbPaginatedResponse<TmdbRawMovie>>(endpoint)
    return data.results.map(TmdbMapper.toUnifiedMovie)
  }
}
