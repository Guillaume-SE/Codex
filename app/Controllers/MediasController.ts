import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Media from 'App/Models/Media'
import Database from '@ioc:Adonis/Lucid/Database'

export default class MediasController {
  public async getAllMedias({ response }: HttpContextContract) {
    const medias = await Media.all()
    response.status(201)
    return medias
  }

  public async getAllGames({ response }: HttpContextContract) {
    const datas = await Media.query()
      .from('medias')
      .join('games_infos', 'medias.id', '=', 'games_infos.media_id')
      .select('medias.*', 'games_infos.developer', 'games_infos.publisher', 'games_infos.plateform')
    const games = datas.map((data) => {
      const { id, mediaParentId, name, type, cover, released, synopsis } = data
      const { developer, publisher, plateform } = data.$extras
      return {
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
      }
    })
    return response.status(201).json(games)
  }

  public async getAllMovies({ response }: HttpContextContract) {
    const datas = await Media.query()
      .from('medias')
      .join('movies_infos', 'medias.id', '=', 'movies_infos.media_id')
      .select(
        'medias.*',
        'movies_infos.director',
        'movies_infos.screenwriter',
        'movies_infos.duration'
      )

    const movies = datas.map((data) => {
      const { id, mediaParentId, name, type, cover, released, synopsis } = data
      const { director, screenwriter, duration } = data.$extras
      return {
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

    const { media_parent_id, type, cover, name, released, synopsis, ...specificMediaInfos } =
      request.body()
    const generalMediaInfo = { media_parent_id, type, cover, name, released, synopsis }

    const isVideoGameType = videoGameType.includes(type)
    const isBookType = bookType.includes(type)
    const isMovieType = movieType.includes(type)
    const isSeasonType = seasonType.includes(type)
    const asNoValidType = !allTypes.flat().includes(type)

    if (asNoValidType) {
      return response.status(404).json("Le type de media n'est pas valide")
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
    } catch (error) {
      await trx.rollback()
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
    } catch (error) {}
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
