import { TmdbMapper } from '#mappers/tmdb_mapper'
import { BaseApiService } from '#services/api/base_api_service'
import env from '#start/env'
import type {
  MediaApiProvider,
  MediaCategory,
  UnifiedMediaDetail,
  UnifiedMediaItem,
} from '#types/media'
import type {
  TmdbPaginatedResponse,
  TmdbRawMovie,
  TmdbRawMovieDetail,
  TmdbRawSeries,
  TmdbRawSeriesDetail,
} from '#types/tmdb'

export interface TmdbOptions {
  region?: string
  category?: 'movie' | 'series'
}

export class TmdbService extends BaseApiService implements MediaApiProvider {
  readonly providerName = 'tmdb'
  readonly baseUrl = 'https://api.themoviedb.org/3'

  protected override getHeaders() {
    return {
      Authorization: `Bearer ${env.get('TMDB_READ_TOKEN')}`,
    }
  }

  async getRecentRelease(page = 1, options?: TmdbOptions): Promise<UnifiedMediaItem[]> {
    const params = new URLSearchParams({ page: String(page) })
    if (options?.region) {
      params.append('language', options.region)
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

  async getDetails(apiId: string, category: MediaCategory): Promise<UnifiedMediaDetail> {
    const endpoint =
      category === 'series'
        ? `/tv/${apiId}?append_to_response=videos`
        : `/movie/${apiId}?append_to_response=videos`

    if (category === 'series') {
      const data = await this.request<TmdbRawSeriesDetail>(endpoint)
      return TmdbMapper.toUnifiedSeriesDetail(data)
    }

    const data = await this.request<TmdbRawMovieDetail>(endpoint)
    return TmdbMapper.toUnifiedMovieDetail(data)
  }
}
