import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Media from 'App/Models/Media'
import Database from '@ioc:Adonis/Lucid/Database'
import { retrieveSourceMap } from 'source-map-support'
// import CreateMediaValidator from 'App/Validators/CreateMediaValidator'

export default class MediasController {
  public async getAllMedias({ response }: HttpContextContract) {
    const medias = await Media.all()
    response.status(201)
    return medias
  }

  public async getAllGamesWithReviews({ response }: HttpContextContract) {
    const datas = await Media.query()
      .from('medias')
      .join('games_infos', 'medias.id', '=', 'games_infos.media_id')
      .join('reviews', 'medias.id', '=', 'reviews.media_id')
      .select('medias.*', 'games_infos.developer', 'games_infos.publisher', 'games_infos.plateform')
    const games = datas.map((data) => {
      const { id, mediaParentId, name, type, cover, released, synopsis } = data
      const { developer, publisher, plateform, status, rating, notes, is_favorite } = data.$extras
      return {
        game: {
          id,
          mediaParentId,
          name,
          type,
          cover,
          released,
          synopsis,
          developer,
          publisher,
          plateform,
        },
        review: {
          status,
          rating,
          notes,
          is_favorite,
        },
      }
    })
    return response.status(201).json(games)
  }

  public async getAllMoviesWithReviews({ response }: HttpContextContract) {
    const datas = await Media.query()
      .from('medias')
      .join('movies_infos', 'medias.id', '=', 'movies_infos.media_id')
      .join('reviews', 'medias.id', '=', 'reviews.media_id')
      .select(
        'medias.*',
        'movies_infos.director',
        'movies_infos.screenwriter',
        'movies_infos.duration',
        'reviews.status',
        'reviews.rating',
        'reviews.notes',
        'reviews.is_favorite',
        'reviews.created_at',
        'reviews.updated_at'
      )
    // .toQuery()
    // console.log(datas)

    const movies = datas.map((data) => {
      const { id, mediaParentId, name, type, cover, released, synopsis } = data
      const { director, screenwriter, duration, status, rating, notes, is_favorite } = data.$extras
      return {
        movie: {
          id,
          mediaParentId,
          name,
          type,
          cover,
          released,
          synopsis,
          director,
          screenwriter,
          duration,
        },
        review: {
          status,
          rating,
          notes,
          is_favorite,
        },
      }
    })
    return response.status(201).json(movies)
  }

  public async getOneMediaById({ params, response }: HttpContextContract) {
    const payload = params.id
    try {
      const media = await Media.findOrFail(payload)
      response.status(201)
      return media
    } catch (error) {
      return response.status(404).badRequest(error.message)
    }
  }

  //ADMIN
  public async addOneMedia({ request, response }: HttpContextContract) {
    const bookType = ['manga', 'comics', 'bande dessinée', 'artbook']
    const movieType = ['film']
    const videoGameType = ['jeu vidéo', 'dlc']
    const seasonType = ['series', 'animé', 'dessin animé', 'cartoon']
    const allTypes = [bookType, movieType, videoGameType, seasonType]

    const { mediaParentId, type, cover, name, released, synopsis, ...specificMediaInfos } =
      request.body()
    const generalMediaInfo = { mediaParentId, type, cover, name, released, synopsis }
    // const mediaValidate = await request.validate(CreateMediaValidator)

    const isVideoGameType = videoGameType.includes(type)
    const isBookType = bookType.includes(type)
    const isMovieType = movieType.includes(type)
    const isSeasonType = seasonType.includes(type)
    const asNoValidType = !allTypes.flat().includes(type)

    if (asNoValidType) {
      return response.status(400).json("Le type de media n'est pas valide")
    }

    const trx = await Database.transaction()

    try {
      const media = await Media.create(generalMediaInfo, { client: trx })

      if (isVideoGameType) {
        await media.related('gameInfo').create(specificMediaInfos)
      }

      if (isMovieType) {
        await media.related('movieInfo').create(specificMediaInfos)
      }

      await trx.commit()
      return response.status(201).json(media)
    } catch (error) {
      await trx.rollback()
      return response.status(400).json(error)
    }
  }

  public async updateOneMedia({ request, params, response }: HttpContextContract) {
    const mediaId = params.id
    const data = request.body()
    const media = await Media.find(mediaId)
    if (!media) {
      return response.status(404).json('Aucun media correspondant à cet id')
    }
    try {
      await media.merge(data).save()
      return response.status(201).json(media)
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  public async deleteOneMedia({ params, response }: HttpContextContract) {
    const mediaId = params.id
    const media = await Media.find(mediaId)
    if (!media) {
      return response.status(404).json('Aucun media correspondant à cet id')
    }
    try {
      await media.delete()
      return response.status(201).json(media)
    } catch (error) {
      return response.status(404)
    }
  }
}
