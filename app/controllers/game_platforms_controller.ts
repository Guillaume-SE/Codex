import GamePlatformService from '#services/game_platform_service'
import {
  createGamePlatformValidator,
  deleteGamePlatformValidator,
  updateGamePlatformValidator,
} from '#validators/game_platform_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class GamePlatformsController {
  constructor(private gamePlatformService: GamePlatformService) {}

  public async addOne({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createGamePlatformValidator)
      const platform = await this.gamePlatformService.store(data)
      return response.status(201).json(platform)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async updateOne({ params, request, response }: HttpContext) {
    const platformId = params.platformId

    try {
      const { params, ...data } = await request.validateUsing(updateGamePlatformValidator)
      const platform = await this.gamePlatformService.update(data, platformId)

      return response.status(201).json(platform)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async deleteOne({ request, params, response }: HttpContext) {
    const platformId = params.platformId

    try {
      await request.validateUsing(deleteGamePlatformValidator)
      await this.gamePlatformService.delete(platformId)

      return response.status(202)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }
}
