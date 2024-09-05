import GamePlatformService from '#services/game_platform_service'
import { manageGamePlatformValidator } from '#validators/game_platform_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class GamePlatformsController {
  constructor(readonly gamePlatformService: GamePlatformService) {}

  public async addOnePlatform({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(manageGamePlatformValidator)
      const platform = await this.gamePlatformService.addOnePlatform(data)
      return response.status(201).json(platform)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async updateOnePlatform({ params, request, response }: HttpContext) {
    const platformId = params.platformId

    try {
      const data = await request.validateUsing(manageGamePlatformValidator)
      const platform = await this.gamePlatformService.updateOnePlatform(data, platformId)
      return response.status(201).json(platform)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async deleteOnePlatform({ params, response }: HttpContext) {
    const platformId = params.platformId

    try {
      await this.gamePlatformService.deleteOnePlatform(platformId)
      return response.status(202)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }
}
