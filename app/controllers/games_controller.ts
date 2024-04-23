import { AlreadyExistError, WrongMediaTypeError } from '#app/exceptions/CustomError'
import CreateGameValidator from '#app/validators/CreateGameValidator'
import UpdateGameValidator from '#app/validators/UpdateGameValidator'
import CoverService from '#services/cover_service'
import GameService from '#services/game_service'
import MediaService from '#services/media_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class GamesController {
  constructor(
    protected mediaService: MediaService,
    protected gameService: GameService,
    protected coverService: CoverService
  ) {}

  public async addOneGame({ request, response }: HttpContext) {
    const payloadValidation = await request.validate(CreateGameValidator)

    try {
      const newMedia = await this.gameService.addOneGame(payloadValidation)
      return response.status(201).json(newMedia)
    } catch (error) {
      if (error instanceof AlreadyExistError || error instanceof WrongMediaTypeError) {
        return response.status(400).json({
          name: error.name,
          message: error.message,
        })
      }
      console.error(error)
    }
  }

  public async updateOneGame({ request, params, response }: HttpContext) {
    const mediaId = params.id
    const payloadValidation = await request.validate(UpdateGameValidator)
    try {
      const game = await this.gameService.updateOneGame(payloadValidation, mediaId)

      return response.status(201).json(game)
    } catch (error) {
      if (error instanceof AlreadyExistError || error instanceof WrongMediaTypeError) {
        return response.status(400).json({
          name: error.name,
          message: error.message,
        })
      }
      console.error(error)
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
