import AnimeInfo from '#models/anime_info'
import type { HttpContext } from '@adonisjs/core/http'

export default class AnimeController {
  public async getAllAnime({ response }: HttpContext) {}

  public async getOneAnimeById({ params, response }: HttpContext) {
    const mediaId = params.id
    try {
      const media = await AnimeInfo.findBy('mediaId', mediaId)
      return response.status(201).json(media)
    } catch (error) {
      return response.status(404).json(error)
    }
  }
}
