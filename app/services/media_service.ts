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

  async getHomeFeed() {
    const [movies, series] = await Promise.all([
      this.tmdbService.getRecentRelease(1, { category: 'movie' }),
      this.tmdbService.getRecentRelease(1, { category: 'series' }),
    ])

    return { movies, series }
  }

  async getMediaDetails(category: MediaCategory, apiId: string, userId?: number) {
    const provider = CATEGORY_PROVIDER_MAP[category]
    let details: UnifiedMediaDetail

    if (provider === 'tmdb') {
      details = await this.tmdbService.getDetails(apiId, category)
    } else {
      throw new Error(`Provider ${provider} is not supported`)
    }

    // Check user tracking in local DB if user is logged in
    let userProgress: UserMedia | null = null
    if (userId) {
      userProgress = await UserMedia.query()
        .where('user_id', userId)
        .whereHas('media', (query) => {
          query.where('api_id', apiId).whereHas('provider', (p) => p.where('name', provider))
        })
        .preload('status')
        .first()
    }

    return { details, userProgress }
  }
}
