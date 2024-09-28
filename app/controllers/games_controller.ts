import GameService from '#services/game_service'
import MediaService from '#services/media_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class GamesController {
  constructor(
    readonly gameService: GameService,
    readonly mediaService: MediaService
  ) {}

  public async show({ view, response }: HttpContext) {
    try {
      const mediaList = await this.mediaService.getMediaList()
      const gamesList = await this.gameService.getList(mediaList)
      return view.render('pages/games/show-all', { gamesList })
    } catch (error) {
      return response.status(404).json(error)
    }
  }
}
