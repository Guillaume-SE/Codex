import { TMDB_CONSTANTS } from '#constants/tmdb'
import type { CastMember, CrewMember, UnifiedMediaDetail, UnifiedMediaItem } from '#types/media'
import type {
  TmdbAggregateCastMember,
  TmdbAlternativeTitlesResponse,
  TmdbCastMember,
  TmdbCreatedBy,
  TmdbCrewMember,
  TmdbRawBaseDetail,
  TmdbRawMovie,
  TmdbRawMovieDetail,
  TmdbRawSeries,
  TmdbRawSeriesDetail,
  TmdbVideoResults,
} from '#types/tmdb'

// construct poster url
function buildImageUrl(
  path?: string | null,
  size: string = TMDB_CONSTANTS.posterSizes.medium
): string | undefined {
  if (!path) {
    return undefined
  }
  return `${TMDB_CONSTANTS.imageBaseUrl}/${size}${path}`
}

function extractTrailerKey(videos?: TmdbVideoResults): string | undefined {
  if (!videos?.results?.length) {
    return undefined
  }

  const youtubeVideos = videos.results.filter((v) => v.site === 'YouTube')
  const video =
    youtubeVideos.find((v) => v.type === 'Trailer' && v.official) ??
    youtubeVideos.find((v) => v.type === 'Teaser' && v.official)

  return video?.key
}

// extract movie cast (standard credits)
function extractCast(cast?: TmdbCastMember[]): CastMember[] {
  if (!cast?.length) {
    return []
  }
  return cast.slice(0, 10).map((person) => ({
    id: person.id,
    name: person.name,
    character: person.character,
    profileUrl: buildImageUrl(person.profile_path, 'w185'),
  }))
}

// extract TV series cast (aggregate credits with fallback)
function extractAggregateCast(aggregateCast?: TmdbAggregateCastMember[]): CastMember[] {
  if (!aggregateCast?.length) {
    return []
  }
  return aggregateCast.slice(0, 10).map((person) => ({
    id: person.id,
    name: person.name,
    character: person.roles?.[0]?.character || '',
    profileUrl: buildImageUrl(person.profile_path, 'w185'),
  }))
}

// extracts Directors & Key Writers for Movies
function extractMovieCrew(crew?: TmdbCrewMember[]): CrewMember[] {
  if (!crew?.length) {
    return []
  }

  const relevantJobs = ['Director', 'Writer', 'Screenplay', 'Story']
  const crewMap = new Map<number, { person: TmdbCrewMember; jobs: Set<string> }>() // group multiple jobs into one person

  for (const member of crew) {
    if (!relevantJobs.includes(member.job)) continue

    const existing = crewMap.get(member.id)
    const jobLabel = member.job === 'Director' ? 'Director' : 'Writer'

    if (existing) {
      existing.jobs.add(jobLabel)
    } else {
      crewMap.set(member.id, {
        person: member,
        jobs: new Set([jobLabel]), // group all unique job of the person
      })
    }
  }

  return Array.from(crewMap.values())
    .slice(0, 4) // Keep max 4 key crew members
    .map(({ person, jobs }) => ({
      id: person.id,
      name: person.name,
      job: Array.from(jobs).join(' / '),
    }))
}

// extracts Creators for TV Series
function extractSeriesCrew(createdBy?: TmdbCreatedBy[]): CrewMember[] {
  if (!createdBy?.length) {
    return []
  }
  return createdBy.map((person) => ({
    id: person.id,
    name: person.name,
    job: 'Creator',
  }))
}

function extractFrenchTitle(
  rawTitles?: TmdbAlternativeTitlesResponse,
  mainTitle?: string,
  originalTitle?: string
): string | undefined {
  const list = rawTitles?.titles ?? rawTitles?.results ?? []
  if (!list.length) {
    return undefined
  }

  const frEntry = list.find((item) => item.iso_3166_1 === 'FR')
  if (!frEntry?.title) {
    return undefined
  }

  const cleanFr = frEntry.title.trim()
  const cleanMain = mainTitle?.trim().toLowerCase()
  const cleanOriginal = originalTitle?.trim().toLowerCase()

  // suppress if French title is identical to main English title or original title
  if (cleanFr.toLowerCase() === cleanMain || cleanFr.toLowerCase() === cleanOriginal) {
    return undefined
  }

  return cleanFr
}

function extractCommonDetails(item: TmdbRawBaseDetail) {
  return {
    overview: item.overview || undefined,

    genres: item.genres?.map((g) => g.name) ?? [],
    status: item.status,
    trailerKey: extractTrailerKey(item.videos),
    originCountry: item.origin_country ?? [],
    spokenLanguages: item.spoken_languages?.map((l) => l.english_name || l.name) ?? [],
    productionCompanies:
      item.production_companies?.map((c) => ({
        id: c.id,
        name: c.name,
      })) ?? [],
  }
}

export class TmdbMapper {
  static toUnifiedMovie(item: TmdbRawMovie): UnifiedMediaItem {
    return {
      apiId: String(item.id),
      provider: 'tmdb',
      category: 'movie',
      title: item.title,
      releaseDate: item.release_date || undefined,
      posterUrl: buildImageUrl(item.poster_path),
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
      posterUrl: buildImageUrl(item.poster_path),
      rating: item.vote_average ?? undefined,
    }
  }

  static toUnifiedMovieDetail(item: TmdbRawMovieDetail): UnifiedMediaDetail {
    const baseItem = TmdbMapper.toUnifiedMovie(item)
    const originalTitle = item.original_title !== item.title ? item.original_title : undefined

    return {
      ...baseItem,
      ...extractCommonDetails(item),
      originalTitle,
      frenchTitle: extractFrenchTitle(item.alternative_titles, baseItem.title, originalTitle),
      runtime: item.runtime ?? undefined,
      budget: item.budget || undefined,
      revenue: item.revenue || undefined,
      belongsToCollection: item.belongs_to_collection
        ? {
            id: item.belongs_to_collection.id,
            name: item.belongs_to_collection.name,
          }
        : undefined,
      crew: extractMovieCrew(item.credits?.crew),
      cast: extractCast(item.credits?.cast),
      recommendations:
        item.recommendations?.results?.slice(0, 8).map(TmdbMapper.toUnifiedMovie) ?? [],
    }
  }

  static toUnifiedSeriesDetail(item: TmdbRawSeriesDetail): UnifiedMediaDetail {
    const baseItem = TmdbMapper.toUnifiedSeries(item)
    const originalTitle = item.original_name !== item.name ? item.original_name : undefined

    return {
      ...baseItem,
      ...extractCommonDetails(item),
      originalTitle,
      frenchTitle: extractFrenchTitle(item.alternative_titles, baseItem.title, originalTitle),
      numberOfSeasons: item.number_of_seasons,
      numberOfEpisodes: item.number_of_episodes,
      crew: extractSeriesCrew(item.created_by),
      cast: extractAggregateCast(item.aggregate_credits?.cast),
      recommendations:
        item.recommendations?.results?.slice(0, 8).map(TmdbMapper.toUnifiedSeries) ?? [],
    }
  }
}
