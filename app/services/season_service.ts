import { createAlternativeText } from '#functions/create_cover_alt_text'
import { ISeason } from '#interfaces/media_interfaces'
import Media from '#models/media'
import SeasonInfo from '#models/season_info'
import CoverService from '#services/cover_service'
import MediaService from '#services/media_service'
import env from '#start/env'
import { inject } from '@adonisjs/core'

@inject()
export default class SeasonService {
  constructor(
    protected mediaService: MediaService,
    protected coverService: CoverService
  ) {}
  protected defaultCoverFilename = env.get('DEFAULT_COVER_FILENAME')
  protected defaultCoverAltText = env.get('DEFAULT_COVER_ALT_TEXT')

  async addOneSeason(payload: ISeason) {
    const {
      mediaParentId,
      type,
      cover,
      name,
      released,
      synopsis,
      status,
      rating,
      opinion,
      isFavorite,
      ...specificSeasonInfos
    } = payload

    await this.mediaService.isMediaAlreadyAdded(type, name, released)

    let coverName = this.defaultCoverFilename
    let coverAltText = this.defaultCoverAltText
    if (cover) {
      const newCover = await this.coverService.saveCover(type, name, cover.tmpPath)
      coverName = newCover.coverName
      coverAltText = newCover.coverAltText
    }

    const generalMediaInfos = { mediaParentId, type, name, released, synopsis }
    const coverInfo = { filename: coverName, alternative: coverAltText }
    const reviewInfo = { status, rating, opinion, isFavorite }

    const newMedia = await Media.create(generalMediaInfos)
    await newMedia.related('seasonInfo').create(specificSeasonInfos)
    await newMedia.related('cover').create(coverInfo)
    await newMedia.related('review').create(reviewInfo)

    return {
      media: generalMediaInfos,
      season: specificSeasonInfos,
      cover: coverInfo,
      review: reviewInfo,
    }
  }

  async updateOneSeason(payload: ISeason, mediaId: number) {
    const media = await this.mediaService.isMediaExist(mediaId)
    if (!media) {
      throw new Error('pas de media')
    }

    const cover = await this.coverService.isCoverExist(mediaId)
    if (!cover) {
      throw new Error('pas de cover')
    }
    const season = await this.isSeasonExist(mediaId)
    if (!season) {
      throw new Error('pas de saison')
    }
    const { mediaParentId, type, name, released, synopsis, ...specificSeasonInfos } = payload
    const generalMediaInfos = { mediaParentId, type, name, released, synopsis }

    // update also the cover alt text
    const mediaNameAsChanged = media.name !== payload.name
    const isNotDefaultCover = cover.alternative !== this.defaultCoverAltText
    const newCoverAltText = createAlternativeText(type, name)

    media.merge(generalMediaInfos).save()
    season.merge(specificSeasonInfos).save()
    if (mediaNameAsChanged && isNotDefaultCover) {
      cover.merge({ alternative: newCoverAltText }).save()
    }

    return { media: generalMediaInfos, season: specificSeasonInfos, cover: newCoverAltText }
  }

  async getAllSeasons() {
    const datas = await Media.query()
      .from('media')
      .join('seasons_infos', 'media.id', '=', 'seasons_infos.media_id')
      .join('reviews', 'media.id', '=', 'reviews.media_id')
      .join('covers', 'media.id', '=', 'covers.media_id')
      .select(
        'media.id',
        'media.media_parent_id',
        'media.name',
        'media.type',
        'media.released',
        'media.synopsis',
        'covers.filename',
        'covers.alternative',
        'seasons_infos.creator',
        'seasons_infos.length',
        'reviews.status',
        'reviews.rating',
        'reviews.opinion',
        'reviews.is_favorite',
        'reviews.created_at',
        'reviews.updated_at'
      )

    const seasons = datas.map((data) => {
      const { id, mediaParentId, name, type, released, synopsis } = data
      const {
        filename,
        alternative,
        creator,
        length,
        status,
        rating,
        opinion,
        is_favorite: isFavorite,
        created_at: createdAt,
        updated_at: updatedAt,
      } = data.$extras
      return {
        season: {
          id,
          mediaParentId,
          name,
          type,
          released,
          synopsis,
          creator,
          length,
        },
        cover: {
          filename,
          alternative,
        },
        review: {
          status,
          rating,
          opinion,
          isFavorite,
          createdAt,
          updatedAt,
        },
      }
    })
    return seasons
  }

  async getOneSeasonByMediaId(mediaId: number) {
    const datas = await Media.query()
      .from('media')
      .join('seasons_infos', 'media.id', '=', 'seasons_infos.media_id')
      .join('reviews', 'media.id', '=', 'reviews.media_id')
      .join('covers', 'media.id', '=', 'covers.media_id')
      .select(
        'media.id',
        'media.media_parent_id',
        'media.name',
        'media.type',
        'media.released',
        'media.synopsis',
        'covers.filename',
        'covers.alternative',
        'seasons_infos.creator',
        'seasons_infos.length',
        'reviews.status',
        'reviews.rating',
        'reviews.opinion',
        'reviews.is_favorite',
        'reviews.created_at',
        'reviews.updated_at'
      )
      .where('media.id', '=', mediaId)

    const noSeasonFound = datas.length === 0
    if (noSeasonFound) {
      throw new Error("Aucune saison correspondant n'a été trouvée")
    }
    const season = datas.map((data) => {
      const { id, mediaParentId, name, type, released, synopsis } = data
      const {
        filename,
        alternative,
        creator,
        length,
        status,
        rating,
        opinion,
        is_favorite: isFavorite,
        created_at: createdAt,
        updated_at: updatedAt,
      } = data.$extras

      return {
        season: {
          id,
          mediaParentId,
          name,
          type,
          released,
          synopsis,
          creator,
          length,
        },
        cover: {
          filename,
          alternative,
        },
        review: {
          status,
          rating,
          opinion,
          isFavorite,
          createdAt,
          updatedAt,
        },
      }
    })
    return season
  }

  async isSeasonExist(mediaId: number) {
    const season = await SeasonInfo.findBy('media_id', mediaId)
    return season
  }
}
