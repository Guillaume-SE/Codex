import { TMDB_CONSTANTS } from '#constants/tmdb'
import type { UnifiedMediaDetail, UnifiedMediaItem } from '#types/media'
import type {
  TmdbRawMovie,
  TmdbRawMovieDetail,
  TmdbRawSeries,
  TmdbRawSeriesDetail,
} from '#types/tmdb'

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

  static toUnifiedMovieDetail(item: TmdbRawMovieDetail): UnifiedMediaDetail {
    return {
      ...TmdbMapper.toUnifiedMovie(item),
      overview: item.overview || undefined,
      genres: item.genres?.map((g) => g.name) ?? [],
      status: item.status,
      runtime: item.runtime ?? undefined,
    }
  }

  static toUnifiedSeriesDetail(item: TmdbRawSeriesDetail): UnifiedMediaDetail {
    return {
      ...TmdbMapper.toUnifiedSeries(item),
      overview: item.overview || undefined,
      genres: item.genres?.map((g) => g.name) ?? [],
      status: item.status,
      numberOfSeasons: item.number_of_seasons,
      numberOfEpisodes: item.number_of_episodes,
    }
  }
}
