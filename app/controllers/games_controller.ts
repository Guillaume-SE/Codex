import GameService from '#services/game_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class GamesController {
  constructor(readonly gameService: GameService) {}

  public async getAllGames({ response }: HttpContext) {
    const games = await this.gameService.getAllGames()
    return response.status(201).json(games)
  }

  public async getOneGameByMediaId({ params, response }: HttpContext) {
    const mediaId = params.mediaId

    try {
      const game = await this.gameService.getOneGameByMediaId(mediaId)
      return response.status(200).json(game)
    } catch (NotFoundError) {
      return response
        .status(404)
        .json({ error_name: NotFoundError.name, error_message: NotFoundError.message })
    }
  }
}
