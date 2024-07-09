import { createAlternativeText } from '#functions/create_cover_alt_text'
import type { IGameInfos } from '#interfaces/media_infos_interface'
import GameInfo from '#models/game_info'
import Media from '#models/media'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import { PathLike } from 'node:fs'

@inject()
export default class GameService {
  readonly defaultCoverFilename = env.get('DEFAULT_COVER_FILENAME')
  readonly defaultCoverAltText = env.get('DEFAULT_COVER_ALT_TEXT')
  readonly coverResizedDir: string | PathLike = env.get('COVER_RESIZED_DIR')
  readonly coverRawDir: string | PathLike = env.get('COVER_RAW_DIR')

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
