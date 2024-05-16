import CoverService from '#services/cover_service'
import GameService from '#services/game_service'
import MediaService from '#services/media_service'
import { createGameValidator, updateGameValidator } from '#validators/game_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class GamesController {
  constructor(
    readonly mediaService: MediaService,
    readonly gameService: GameService,
    readonly coverService: CoverService
  ) {}

  public async addOneGame({ request, response }: HttpContext) {
    try {
      const payloadValidation = await request.validateUsing(createGameValidator)
      const newMedia = await this.gameService.addOneGame(payloadValidation)
      return response.status(201).json(newMedia)
    } catch (error) {
      return response.status(400).json({ error })
    }
  }

  public async updateOneGame({ request, params, response }: HttpContext) {
    const mediaId = params.mediaId
    try {
      const payloadValidation = await request.validateUsing(updateGameValidator)
      const game = await this.gameService.updateOneGame(payloadValidation, mediaId)

      return response.status(201).json(game)
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ error })
      }
      return response.status(400).json({ error })
    }
  }

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
