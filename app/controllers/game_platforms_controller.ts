import GamePlatform from '#models/game_platform'
import GamePlatformService from '#services/game_platform_service'
import {
  createGamePlatformValidator,
  platformValidator,
  updateGamePlatformValidator,
} from '#validators/game_platform_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class GamePlatformsController {
  constructor(private gamePlatformService: GamePlatformService) {}

  async showManage({ inertia }: HttpContext) {
    const platformList: GamePlatform[] = await GamePlatform.all()

    return inertia.render('admin/ManageGamePlatform', {
      platformList,
    })
  }

  public async storeOrUpdate({ request, response }: HttpContext) {
    // for update
    if (request.params().platformId) {
      const { params, ...data } = await request.validateUsing(updateGamePlatformValidator)
      await this.gamePlatformService.storeOrUpdate(data, params.platformId)
      return response.redirect().toRoute('platform.manage')
    }
    // for create
    const data = await request.validateUsing(createGamePlatformValidator)
    await this.gamePlatformService.storeOrUpdate(data)

    return response.redirect().toRoute('platform.manage')
  }

  public async deleteOne({ request, response }: HttpContext) {
    const { params } = await request.validateUsing(platformValidator)
    await this.gamePlatformService.delete(params.platformId)

    return response.redirect().toRoute('platform.manage')
  }
}
