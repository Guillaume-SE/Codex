import { TMDB_CONSTANTS } from '#constants/tmdb'
import type { UnifiedMediaDetail, UnifiedMediaItem } from '#types/media'
import type {
  TmdbRawBaseDetail,
  TmdbRawMovie,
  TmdbRawMovieDetail,
  TmdbRawSeries,
  TmdbRawSeriesDetail,
  TmdbVideoResults,
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

  private static extractTrailerKey(videos?: TmdbVideoResults): string | undefined {
    if (!videos?.results?.length) {
      return undefined
    }

    const youtubeVideos = videos.results.filter((v) => v.site === 'YouTube')
    const video =
      youtubeVideos.find((v) => v.type === 'Trailer' && v.official) ??
      youtubeVideos.find((v) => v.type === 'Teaser' && v.official)

    return video?.key
  }

  private static extractCommonDetails(item: TmdbRawBaseDetail) {
    return {
      overview: item.overview || undefined,
      genres: item.genres?.map((g) => g.name) ?? [],
      status: item.status,
      originCountry: item.origin_country ?? [],
      spokenLanguages: item.spoken_languages?.map((l) => l.english_name || l.name) ?? [],
      productionCompanies:
        item.production_companies?.map((c) => ({
          id: c.id,
          name: c.name,
        })) ?? [],
      trailerKey: TmdbMapper.extractTrailerKey(item.videos),
    }
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
      ...TmdbMapper.extractCommonDetails(item),
      runtime: item.runtime ?? undefined,
      budget: item.budget || undefined,
      revenue: item.revenue || undefined,
      belongsToCollection: item.belongs_to_collection
        ? {
            id: item.belongs_to_collection.id,
            name: item.belongs_to_collection.name,
          }
        : undefined,
    }
  }

  static toUnifiedSeriesDetail(item: TmdbRawSeriesDetail): UnifiedMediaDetail {
    return {
      ...TmdbMapper.toUnifiedSeries(item),
      ...TmdbMapper.extractCommonDetails(item),
      numberOfSeasons: item.number_of_seasons,
      numberOfEpisodes: item.number_of_episodes,
    }
  }
}
