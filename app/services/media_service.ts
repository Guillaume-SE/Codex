import UserMedia from '#models/user_media'
import { TmdbService } from '#services/api/tmdb_service'
import { MediaCategory, MediaProvider, UnifiedMediaDetail } from '#types/media'
import { inject } from '@adonisjs/core'

const CATEGORY_PROVIDER_MAP: Record<MediaCategory, MediaProvider> = {
  movie: 'tmdb',
  series: 'tmdb',
  anime: 'jikan',
  book: 'hardcover',
  game: 'igdb',
}

@inject()
export class MediaService {
  constructor(protected tmdbService: TmdbService) {}

  async getHomeFeed(locale: string = 'en-US') {
    const [movies, series] = await Promise.all([
      this.tmdbService.getRecentRelease(1, { category: 'movie', language: locale }),
      this.tmdbService.getRecentRelease(1, { category: 'series', language: locale }),
    ])

    return { movies, series }
  }

  async getMediaDetails(
    category: MediaCategory,
    apiId: string,
    locale: string = 'fr-FR',
    userId?: number
  ) {
    const provider = CATEGORY_PROVIDER_MAP[category]

    if (provider !== 'tmdb') {
      throw new Error(`Provider ${provider} is not supported`)
    }

    const [details, userProgress] = await Promise.all([
      this.tmdbService.getDetails(apiId, category, { language: locale }),
      userId ? this.getUserProgress(category, apiId, userId) : null,
    ])

    return { details, userProgress }
  }

  async getSeasonDetails(
    category: MediaCategory,
    seriesApiId: string,
    seasonNumber: number,
    locale: string = 'fr-FR',
    userId?: number
  ) {
    const [season, userProgress] = await Promise.all([
      this.tmdbService.getSeasonDetails(seriesApiId, seasonNumber, { language: locale }),
      userId ? this.getUserProgress(category, seriesApiId, userId) : null,
    ])

    return { season, userProgress }
  }

  private async getUserProgress(
    category: MediaCategory,
    apiId: string,
    userId: number
  ): Promise<UserMedia | null> {
    const provider = CATEGORY_PROVIDER_MAP[category]

    return UserMedia.query()
      .where('user_id', userId)
      .whereHas('media', (mediaQuery) => {
        mediaQuery
          .where('api_id', apiId)
          .whereHas('provider', (providerQuery) => providerQuery.where('name', provider))
          .whereHas('format', (formatQuery) => {
            formatQuery.whereHas('category', (categoryQuery) => {
              categoryQuery.where('name', category)
            })
          })
      })
      .preload('status')
      .first()
  }
}
