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
  TmdbRawCollectionDetail,
  TmdbRawMovie,
  TmdbRawMovieDetail,
  TmdbRawSeries,
  TmdbRawSeriesDetail,
} from '#types/tmdb'

export interface TmdbOptions {
  category?: 'movie' | 'series'
  language?: string
  region?: string
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
    const isSeries = options?.category === 'series'
    const language = options?.language || 'en-US'

    const params = new URLSearchParams({
      page: String(page),
      language,
    })

    if (isSeries) {
      params.append('timezone', 'Europe/Paris')
    } else {
      params.append('region', options?.region || 'FR')
    }

    const endpoint = isSeries ? `/tv/on_the_air?${params}` : `/movie/now_playing?${params}`

    if (isSeries) {
      const data = await this.request<TmdbPaginatedResponse<TmdbRawSeries>>(endpoint)
      return data.results.map(TmdbMapper.toUnifiedSeries)
    }

    const data = await this.request<TmdbPaginatedResponse<TmdbRawMovie>>(endpoint)
    return data.results.map(TmdbMapper.toUnifiedMovie)
  }

  async getDetails(
    apiId: string,
    category: MediaCategory,
    options?: TmdbOptions
  ): Promise<UnifiedMediaDetail> {
    const language = options?.language || 'fr-FR'
    const appendToResponse =
      category === 'series'
        ? 'videos,aggregate_credits,recommendations,translations'
        : 'videos,credits,recommendations,translations'

    const params = new URLSearchParams({
      language: 'en-US',
      append_to_response: appendToResponse,
    })

    const endpoint = `/${category === 'series' ? 'tv' : 'movie'}/${apiId}?${params}`

    if (category === 'series') {
      const data = await this.request<TmdbRawSeriesDetail>(endpoint)
      return TmdbMapper.toUnifiedSeriesDetail(data, language)
    }

    const data = await this.request<TmdbRawMovieDetail>(endpoint)
    let collectionParts: UnifiedMediaItem[] = []

    if (data.belongs_to_collection?.id) {
      collectionParts = await this.getCollectionParts(data.belongs_to_collection.id, language)
    }

    return TmdbMapper.toUnifiedMovieDetail(data, collectionParts, language)
  }

  async getCollectionParts(collectionId: number, language = 'fr-FR'): Promise<UnifiedMediaItem[]> {
    const params = new URLSearchParams({ language })
    const data = await this.request<TmdbRawCollectionDetail>(
      `/collection/${collectionId}?${params}`
    )
    return data.parts?.map(TmdbMapper.toUnifiedMovie) ?? []
  }
}
