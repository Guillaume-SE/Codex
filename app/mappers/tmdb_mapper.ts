import { TMDB_CONSTANTS } from '#constants/tmdb'
import type { UnifiedMediaItem } from '#types/media'
import type { TmdbRawMovie, TmdbRawSeries } from '#types/tmdb'

export class TmdbMapper {
  // construct poster url
  private static buildImageUrl(
    path?: string | null,
    size: string = TMDB_CONSTANTS.posterSizes.medium
  ): string | undefined {
    if (!path) {
      return undefined
    }
    return `${TMDB_CONSTANTS.imageBaseUrl}/${size}${path}`
  }

  static toUnifiedMovie(item: TmdbRawMovie): UnifiedMediaItem {
    return {
      apiId: String(item.id),
      provider: 'tmdb',
      category: 'movie',
      title: item.title,
      releaseDate: item.release_date || undefined,
      posterUrl: TmdbMapper.buildImageUrl(item.poster_path),
      rating: item.vote_average ?? undefined,
    }
  }

  static toUnifiedSeries(item: TmdbRawSeries): UnifiedMediaItem {
    return {
      apiId: String(item.id),
      provider: 'tmdb',
      category: 'series',
      title: item.name,
      releaseDate: item.first_air_date || undefined,
      posterUrl: TmdbMapper.buildImageUrl(item.poster_path),
      rating: item.vote_average ?? undefined,
    }
  }
}
