import { TMDB_CONSTANTS } from '#constants/tmdb'
import type { CastMember, CrewMember, UnifiedMediaDetail, UnifiedMediaItem } from '#types/media'
import type {
  TmdbAggregateCastMember,
  TmdbCastMember,
  TmdbCreatedBy,
  TmdbCrewMember,
  TmdbRawBaseDetail,
  TmdbRawMovie,
  TmdbRawMovieDetail,
  TmdbRawSeries,
  TmdbRawSeriesDetail,
  TmdbTranslationsResponse,
  TmdbVideoResults,
} from '#types/tmdb'
import {
  formatArray,
  formatCountryCodes,
  formatCurrency,
  formatDate,
  formatRuntime,
  formatText,
} from '#utils/formatters'

function buildImageUrl(
  path?: string | null,
  size: string = TMDB_CONSTANTS.posterSizes.medium
): string | undefined {
  if (!path) return undefined
  return `${TMDB_CONSTANTS.imageBaseUrl}/${size}${path}`
}

function extractTrailerKey(videos?: TmdbVideoResults): string | undefined {
  if (!videos?.results?.length) return undefined

  const youtubeVideos = videos.results.filter((v) => v.site === 'YouTube')
  const video =
    youtubeVideos.find((v) => v.type === 'Trailer' && v.official) ??
    youtubeVideos.find((v) => v.type === 'Teaser' && v.official)

  return video?.key
}

function extractCast(cast?: TmdbCastMember[]): CastMember[] {
  if (!cast?.length) return []
  return cast.slice(0, 10).map((person) => ({
    id: person.id,
    name: person.name,
    character: person.character,
    profileUrl: buildImageUrl(person.profile_path, 'w185'),
  }))
}

function extractAggregateCast(aggregateCast?: TmdbAggregateCastMember[]): CastMember[] {
  if (!aggregateCast?.length) return []
  return aggregateCast.slice(0, 10).map((person) => ({
    id: person.id,
    name: person.name,
    character: person.roles?.[0]?.character || '',
    profileUrl: buildImageUrl(person.profile_path, 'w185'),
  }))
}

function extractMovieCrew(crew?: TmdbCrewMember[]): CrewMember[] {
  if (!crew?.length) return []

  const relevantJobs = ['Director', 'Writer', 'Screenplay', 'Story']
  const crewMap = new Map<number, { person: TmdbCrewMember; jobs: Set<string> }>()

  for (const member of crew) {
    if (!relevantJobs.includes(member.job)) continue

    const existing = crewMap.get(member.id)
    const jobLabel = member.job === 'Director' ? 'Director' : 'Writer'

    if (existing) {
      existing.jobs.add(jobLabel)
    } else {
      crewMap.set(member.id, {
        person: member,
        jobs: new Set([jobLabel]),
      })
    }
  }

  return Array.from(crewMap.values())
    .slice(0, 4)
    .map(({ person, jobs }) => ({
      id: person.id,
      name: person.name,
      job: Array.from(jobs).join(' / '),
    }))
}

function extractSeriesCrew(createdBy?: TmdbCreatedBy[]): CrewMember[] {
  if (!createdBy?.length) return []
  return createdBy.map((person) => ({
    id: person.id,
    name: person.name,
    job: 'Creator',
  }))
}

function extractYear(rawDate?: string | null): string | undefined {
  if (!rawDate) return undefined
  const year = rawDate.split('-')[0]
  return year && year.length === 4 ? year : undefined
}

function extractRating(voteAverage?: number | null, voteCount?: number | null): number | undefined {
  if (!voteAverage || voteAverage === 0) return undefined
  if (voteCount === 0) return undefined
  return voteAverage
}

function resolveLocalizedContent(
  item: {
    title?: string
    name?: string
    original_title?: string
    original_name?: string
    original_language?: string
    overview?: string | null
    translations?: TmdbTranslationsResponse
  },
  targetLocale: string = 'fr-FR'
): { title: string; overview?: string } {
  const defaultTitle = item.title || item.name || ''
  const defaultOverview = item.overview?.trim() || undefined
  const isoLang = targetLocale.slice(0, 2).toLowerCase()

  if (isoLang === 'en') {
    return { title: defaultTitle, overview: defaultOverview }
  }

  const translation = item.translations?.translations?.find(
    (t) => t.iso_639_1?.toLowerCase() === isoLang
  )

  const translationTitle = (translation?.data?.title || translation?.data?.name)?.trim()
  const translationOverview = translation?.data?.overview?.trim()

  let title = defaultTitle
  if (translationTitle) {
    title = translationTitle
  } else if (item.original_language?.toLowerCase() === isoLang) {
    const orig = item.original_title || item.original_name
    if (orig?.trim()) {
      title = orig.trim()
    }
  }

  const overview = translationOverview || defaultOverview

  return { title, overview }
}

function extractCommonDetails(item: TmdbRawBaseDetail, targetLocale: string = 'fr-FR') {
  const { overview } = resolveLocalizedContent(item, targetLocale)

  return {
    overview,
    genres: item.genres?.map((g) => g.name) ?? [],
    status: formatText(item.status),
    trailerKey: extractTrailerKey(item.videos),
    originCountry: formatCountryCodes(item.origin_country),
    spokenLanguages: formatArray(item.spoken_languages?.map((l) => l.english_name || l.name)),
    productionCompanies: formatArray(item.production_companies),
  }
}

export class TmdbMapper {
  static toUnifiedMovie(item: TmdbRawMovie): UnifiedMediaItem {
    return {
      apiId: String(item.id),
      provider: 'tmdb',
      category: 'movie',
      title: item.title,
      releaseDate: formatDate(item.release_date),
      releaseYear: extractYear(item.release_date),
      posterUrl: buildImageUrl(item.poster_path),
      rating: extractRating(item.vote_average, item.vote_count),
    }
  }

  static toUnifiedSeries(item: TmdbRawSeries): UnifiedMediaItem {
    return {
      apiId: String(item.id),
      provider: 'tmdb',
      category: 'series',
      title: item.name,
      releaseDate: formatDate(item.first_air_date),
      releaseYear: extractYear(item.first_air_date),
      posterUrl: buildImageUrl(item.poster_path),
      rating: extractRating(item.vote_average, item.vote_count),
    }
  }

  static toUnifiedMovieDetail(
    item: TmdbRawMovieDetail,
    collectionParts: UnifiedMediaItem[] = [],
    targetLocale: string = 'fr-FR'
  ): UnifiedMediaDetail {
    const localized = resolveLocalizedContent(item, targetLocale)
    const baseItem = TmdbMapper.toUnifiedMovie(item)

    return {
      ...baseItem,
      ...extractCommonDetails(item, targetLocale),
      title: localized.title,
      originalTitle: item.original_title !== localized.title ? item.original_title : undefined,
      runtime: formatRuntime(item.runtime),
      budget: formatCurrency(item.budget),
      revenue: formatCurrency(item.revenue),
      belongsToCollection: item.belongs_to_collection
        ? {
            apiId: item.belongs_to_collection.id,
            name: item.belongs_to_collection.name,
            posterUrl: buildImageUrl(item.belongs_to_collection.poster_path),
            parts: collectionParts,
          }
        : undefined,
      crew: extractMovieCrew(item.credits?.crew),
      cast: extractCast(item.credits?.cast),
      recommendations:
        item.recommendations?.results?.slice(0, 8).map(TmdbMapper.toUnifiedMovie) ?? [],
    }
  }

  static toUnifiedSeriesDetail(
    item: TmdbRawSeriesDetail,
    targetLocale: string = 'fr-FR'
  ): UnifiedMediaDetail {
    const localized = resolveLocalizedContent(item, targetLocale)
    const baseItem = TmdbMapper.toUnifiedSeries(item)

    return {
      ...baseItem,
      ...extractCommonDetails(item, targetLocale),
      title: localized.title,
      originalTitle: item.original_name !== localized.title ? item.original_name : undefined,
      numberOfSeasons: item.number_of_seasons,
      numberOfEpisodes: item.number_of_episodes,
      seasons:
        item.seasons?.map((s) => ({
          apiId: s.id,
          name: s.name,
          posterUrl: buildImageUrl(s.poster_path),
          seasonNumber: s.season_number,
          episodeCount: s.episode_count,
          airDate: formatDate(s.air_date),
          airYear: extractYear(s.air_date),
          rating: extractRating(s.vote_average, s.vote_count),
        })) ?? [],
      crew: extractSeriesCrew(item.created_by),
      cast: extractAggregateCast(item.aggregate_credits?.cast),
      recommendations:
        item.recommendations?.results?.slice(0, 8).map(TmdbMapper.toUnifiedSeries) ?? [],
    }
  }
}
