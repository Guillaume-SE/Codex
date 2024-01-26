import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Media from 'App/Models/Media'

export default class GamesController {
  public async getAllGamesWithReviews({ response }: HttpContextContract) {
    const datas = await Media.query()
      .from('medias')
      .join('games_infos', 'medias.id', '=', 'games_infos.media_id')
      .join('reviews', 'medias.id', '=', 'reviews.media_id')
      .leftJoin('covers', 'medias.id', '=', 'covers.media_id')
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
      const { filename, alternative, developer, publisher, platform, status, rating, opinion, is_favorite } = data.$extras
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
          is_favorite,
        },
      }
    })
    return response.status(201).json(games)
  }

  // public async getOneGameById({ params, response }: HttpContextContract) {
  //   const mediaId = params.id
  //   const media = await Media.findOrFail(mediaId)
  //   if(!media) {
  //     return response.status(404).json('Aucun media ne correspond à cet id')
  //   }
  // }
}
