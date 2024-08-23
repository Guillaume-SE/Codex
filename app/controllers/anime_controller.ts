import AnimeService from '#services/anime_service'
import MediaService from '#services/media_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AnimeController {
  constructor(
    readonly mediaService: MediaService,
    readonly animeService: AnimeService
  ) {}

  public async getAllAnime({ response }: HttpContext) {
    try {
      const mediaList = await this.mediaService.getAllMedia()
      const animeList = await this.animeService.getAllAnime(mediaList)
      return response.status(200).json(animeList)
    } catch (error) {
      return response.status(404).json(error)
    }
  }
}
