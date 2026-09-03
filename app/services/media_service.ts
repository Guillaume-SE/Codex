import { TmdbService } from '#services/api/tmdb_service'
import { inject } from '@adonisjs/core'

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
}
