import { createAlternativeText } from '#functions/create_cover_alt_text'
import { IGame } from '#interfaces/media_interface'
import GameInfo from '#models/game_info'
import Media from '#models/media'
import CoverService from '#services/cover_service'
import MediaService from '#services/media_service'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import { PathLike } from 'node:fs'

@inject()
export default class GameService {
  constructor(
    readonly mediaService: MediaService,
    readonly coverService: CoverService
  ) {}
  readonly defaultCoverFilename = env.get('DEFAULT_COVER_FILENAME')
  readonly defaultCoverAltText = env.get('DEFAULT_COVER_ALT_TEXT')
  readonly coverResizedDir: string | PathLike = env.get('COVER_RESIZED_DIR')
  readonly coverRawDir: string | PathLike = env.get('COVER_RAW_DIR')

  async addOneGame(datas: IGame) {
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
      ...specificGameInfos
    } = datas

    await this.mediaService.isMediaAlreadyAdded(type, name, released)

    let coverFilename = this.defaultCoverFilename
    let coverRawFilename = null
    let coverAltText = this.defaultCoverAltText
    if (cover) {
      const newCover = await this.coverService.saveCover(type, name, cover.tmpPath)
      coverFilename = newCover.coverFilename
      coverRawFilename = newCover.coverRawFilename
      coverAltText = newCover.coverAltText
    }

    const generalMediaInfos = { mediaParentId, type, name, released, synopsis }
    const coverInfo = {
      filename: coverFilename,
      filenameRaw: coverRawFilename,
      alternative: coverAltText,
    }
    const reviewInfo = { status, rating, opinion, isFavorite }

    const newMedia = await Media.create(generalMediaInfos)
    await newMedia.related('gameInfo').create(specificGameInfos)
    await newMedia.related('cover').create(coverInfo)
    await newMedia.related('review').create(reviewInfo)

    return {
      media: generalMediaInfos,
      game: specificGameInfos,
      cover: coverInfo,
      review: reviewInfo,
    }
  }

  async updateOneGame(datas: IGame, mediaId: number) {
    const media = await this.mediaService.getOneMediaById(mediaId)
    if (!media) {
      throw new Error('pas de media')
    }

    const cover = await this.coverService.getOneCoverById(mediaId)
    if (!cover) {
      throw new Error('pas de cover')
    }
    const game = await this.isGameExist(mediaId)
    if (!game) {
      throw new Error('pas de jeu')
    }
    const { mediaParentId, type, name, released, synopsis, ...specificGameInfos } = datas
    const generalMediaInfos = { mediaParentId, type, name, released, synopsis }

    // update also the cover alt text
    const mediaNameAsChanged = media.name !== datas.name
    const isNotDefaultCover = cover.alternative !== this.defaultCoverAltText
    const newCoverAltText = createAlternativeText(type, name)

    media.merge(generalMediaInfos).save()
    game.merge(specificGameInfos).save()
    if (mediaNameAsChanged && isNotDefaultCover) {
      cover.merge({ alternative: newCoverAltText }).save()
    }

    return { media: generalMediaInfos, game: specificGameInfos, cover: newCoverAltText }
  }

  public async getAllGames() {
    const datas = await Media.query()
      .from('media')
      .join('games_infos', 'media.id', '=', 'games_infos.media_id')
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
        'covers.filename_raw',
        'covers.alternative',
        'games_infos.developer',
        'games_infos.publisher',
        'games_infos.platform',
        'reviews.status',
        'reviews.rating',
        'reviews.opinion',
        'reviews.is_favorite',
        'reviews.created_at',
        'reviews.updated_at'
      )

    const games = datas.map((data) => {
      const { id, mediaParentId, name, type, released, synopsis } = data
      const {
        filename,
        filename_raw: filenameRaw,
        alternative,
        developer,
        publisher,
        platform,
        status,
        rating,
        opinion,
        is_favorite: isFavorite,
        created_at: createdAt,
        updated_at: updatedAt,
      } = data.$extras
      return {
        game: {
          id,
          mediaParentId,
          name,
          type,
          released,
          synopsis,
          developer,
          publisher,
          platform,
        },
        cover: {
          filename,
          filenameRaw,
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
    return games
  }

  public async getOneGameByMediaId(mediaId: number) {
    const datas = await Media.query()
      .from('media')
      .join('games_infos', 'media.id', '=', 'games_infos.media_id')
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
        'covers.filename_raw',
        'covers.alternative',
        'games_infos.developer',
        'games_infos.publisher',
        'games_infos.platform',
        'reviews.status',
        'reviews.rating',
        'reviews.opinion',
        'reviews.is_favorite',
        'reviews.created_at',
        'reviews.updated_at'
      )
      .where('media.id', '=', mediaId)

    const noGameFound = datas.length === 0
    if (noGameFound) {
      throw new Error("Aucun jeu correspondant n'a été trouvé")
    }
    const game = datas.map((data) => {
      const { id, mediaParentId, name, type, released, synopsis } = data
      const {
        filename,
        filename_raw: filenameRaw,
        alternative,
        developer,
        publisher,
        platform,
        status,
        rating,
        opinion,
        is_favorite: isFavorite,
        created_at: createdAt,
        updated_at: updatedAt,
      } = data.$extras

      return {
        game: {
          id,
          mediaParentId,
          name,
          type,
          released,
          synopsis,
          developer,
          publisher,
          platform,
        },
        cover: {
          filename,
          filenameRaw,
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
    return game
  }

  async isGameExist(mediaId: number) {
    const game = await GameInfo.findBy('media_id', mediaId)
    return game
  }
}
