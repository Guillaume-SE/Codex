import { createAlternativeText } from '#functions/create_cover_alt_text'
import GameInfo from '#models/game_info'
import Media from '#models/media'
import CoverService from '#services/cover_service'
import MediaService from '#services/media_service'
import env from '#start/env'
import { inject } from '@adonisjs/core'

@inject()
export default class GameService {
  constructor(
    protected mediaService: MediaService,
    protected coverService: CoverService
  ) {}
  async addOneGame(payload) {
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
    } = payload

    await this.mediaService.isMediaAlreadyAdded(type, name, released)

    let coverName = env.get('DEFAULT_COVER_FILENAME')
    let coverAltText = env.get('DEFAULT_COVER_ALT_TEXT')
    if (cover) {
      const newCover = await this.coverService.saveCover(type, name, cover.tmpPath)
      coverName = newCover.coverName
      coverAltText = newCover.coverAltText
    }

    const generalMediaInfos = { mediaParentId, type, name, released, synopsis }
    const coverInfo = { filename: coverName, alternative: coverAltText }
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

  async updateOneGame(payload, mediaId: number) {
    const media = await this.mediaService.isMediaExist(mediaId)
    if (!media) {
      throw new Error('pas de media')
    }

    const cover = await this.coverService.isCoverExist(mediaId)
    if (!cover) {
      throw new Error('pas de cover')
    }
    const game = await this.isGameExist(mediaId)
    if (!game) {
      throw new Error('pas de jeu')
    }
    const { mediaParentId, type, name, released, synopsis, ...specificGameInfos } = payload
    const generalMediaInfos = { mediaParentId, type, name, released, synopsis }

    // update also the cover alt text
    const mediaNameAsChanged = media.name !== payload.name
    const newCoverAltText = createAlternativeText(type, name)

    media.merge(generalMediaInfos).save()
    game.merge(specificGameInfos).save()
    if (mediaNameAsChanged) {
      cover.merge({ alternative: newCoverAltText }).save()
    }

    return { media: generalMediaInfos, game: specificGameInfos, cover: newCoverAltText }
  }

  public async getAllGames() {
    const datas = await Media.query()
      .from('medias')
      .join('games_infos', 'medias.id', '=', 'games_infos.media_id')
      .join('reviews', 'medias.id', '=', 'reviews.media_id')
      .join('covers', 'medias.id', '=', 'covers.media_id')
      .select(
        'medias.id',
        'medias.media_parent_id',
        'medias.name',
        'medias.type',
        'medias.released',
        'medias.synopsis',
        'covers.filename',
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
      .from('medias')
      .join('games_infos', 'medias.id', '=', 'games_infos.media_id')
      .join('reviews', 'medias.id', '=', 'reviews.media_id')
      .join('covers', 'medias.id', '=', 'covers.media_id')
      .select(
        'medias.id',
        'medias.media_parent_id',
        'medias.name',
        'medias.type',
        'medias.released',
        'medias.synopsis',
        'covers.filename',
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
      .where('medias.id', '=', mediaId)

    const noGameFound = datas.length === 0
    if (noGameFound) {
      throw new Error("Aucun jeu correspondant n'a été trouvé")
    }
    const game = datas.map((data) => {
      const { id, mediaParentId, name, type, released, synopsis } = data
      const {
        filename,
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
