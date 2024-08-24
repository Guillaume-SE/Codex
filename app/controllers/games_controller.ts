import { ICompleteMediaCard } from '#interfaces/media_interface'
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

  public async getAllGames({ response }: HttpContext) {
    try {
      const mediaList = await this.mediaService.getAllMedia()
      const gamesList: ICompleteMediaCard[] = await this.gameService.getAllGames(mediaList)
      return response.status(200).json(gamesList)
    } catch (error) {
      return response.status(404).json(error)
    }
  }
}
