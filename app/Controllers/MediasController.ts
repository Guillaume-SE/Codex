import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Media from 'App/Models/Media'
import GameInfo from 'App/Models/GameInfo'
import MovieInfo from 'App/Models/MovieInfo'
import { IMedia } from 'App/Interfaces/Media'

export default class MediasController {
  public async getAllMedias({ response }: HttpContextContract) {
    const medias = await Media.all()
    response.status(201)
    return medias
  }

  public async getAllMovies({ response }: HttpContextContract) {
    const movies = await Media.query()
      .from('medias')
      .join('movies_infos', 'medias.id', '=', 'movies_infos.media_id')
      .select('medias.*')
      .select('movies_infos.director', 'movies_infos.screenwriter', 'movies_infos.duration')
    response.status(201)
    return movies
  }

  public async getAllGames({ response }: HttpContextContract) {
    const games = await Media.query()
      .from('medias')
      .join('games_infos', 'medias.id', '=', 'games_infos.media_id')
      .select('medias.*')
      .select('games_infos.developer', 'games_infos.publisher', 'games_infos.plateform')
    response.status(201)
    return games
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

    const { media_parent_id, type, cover, name, released, synopsis, ...mediaInfos } = request.body()
    const data: IMedia = { media_parent_id, type, cover, name, released, synopsis }

    const isVideoGameType = videoGameType.includes(type)
    const isBookType = bookType.includes(type)
    const isMovieType = movieType.includes(type)
    const isSeasonType = seasonType.includes(type)
    const asNoValidType = !allTypes.flat().includes(type)

    if (asNoValidType) {
      return response.status(404).json("Le type de media n'est pas valide")
    }

    const lastMediaCreated = await Media.query()
      .select('id')
      .from('medias')
      .orderBy('id', 'desc')
      .limit(1)
    const media = await Media.create(data)

    if (isVideoGameType) {
      const { developer, publisher, plateform } = mediaInfos
      const gameData = {
        mediaId: lastMediaCreated[0].id,
        developer,
        publisher,
        plateform,
      }
      const gameInfo = await GameInfo.create(gameData)
      return response.status(201).json([media, gameInfo])
    }
    if (isBookType) {
    }
    if (isMovieType) {
      const { director, screenwriter, duration } = mediaInfos
      const movieData = {
        mediaId: lastMediaCreated[0].id,
        director,
        screenwriter,
        duration,
      }
      const movieInfo = await MovieInfo.create(movieData)
      return response.status(201).json([media, movieInfo])
    }
    if (isSeasonType) {
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
