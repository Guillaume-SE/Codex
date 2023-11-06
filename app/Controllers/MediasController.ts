import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Media from 'App/Models/Media'
import GameInfo from 'App/Models/GameInfo'
import MovieInfo from 'App/Models/MovieInfo'

export default class MediasController {
  public async getAll({ response }: HttpContextContract) {
    const media = await Media.all()
    response.status(201)
    return media
  }

  public async getOneById({ params, response }: HttpContextContract) {
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
  public async addOne({ request, response }: HttpContextContract) {
    const bookType = ['manga', 'comics', 'bande dessinée', 'artbook']
    const movieType = ['film']
    const videoGameType = ['jeu vidéo', 'dlc']
    const seasonType = ['series', 'animé', 'dessin animé', 'cartoon']
    const allTypes = [bookType, movieType, videoGameType, seasonType]

    const { media_parent_id, type, cover, name, released, synopsis, ...mediaInfos } = request.body()

    const isVideoGameType = videoGameType.includes(type)
    const isBookType = bookType.includes(type)
    const isMovieType = movieType.includes(type)
    const isSeasonType = seasonType.includes(type)
    const asNoValidType = !allTypes.flat().includes(type)

    if (asNoValidType) {
      return response.status(404).json("Le type de media n'est pas valide")
    }

    const data = { media_parent_id, type, cover, name, released, synopsis }
    const lastMediaCreated = await Media.query()
      .select('id')
      .from('medias')
      .orderBy('id', 'desc')
      .limit(1)
    const media = await Media.create(data)

    if (isVideoGameType) {
      // console.log(`c'est un jeu et il est de type ${type}`)
    }
    if (isBookType) {
      // console.log(`c'est un livre et il est de type ${type}`)
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
      response.status(201)
      return [media, movieInfo]
    }
    if (isSeasonType) {
      // console.log(`c'est une saison et elle est de type ${type}`)
    }
  }

  public async updateOne({ request, params, response }: HttpContextContract) {
    const mediaId = params.id
    const data = request.body()
    const media = await Media.find(mediaId)
    if (!media) {
      const message = 'Aucun media trouvé'
      return response.status(404).json(message)
    }
    await media.merge(data).save()
    response.json(media)
  }

  public async deleteOne({ params, response }: HttpContextContract) {
    const mediaId = params.id
    const media = await Media.find(mediaId)
    if (!media) {
      const message = 'Aucun media trouvé'
      return response.status(404).json(message)
    }
    await media.delete()
    response.json(media)
  }
}
