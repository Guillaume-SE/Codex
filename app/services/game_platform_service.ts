import GamePlatform from '#models/game_platform'
import { updateGamePlatformValidator } from '#validators/game_platform_validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type updatedData = Omit<Infer<typeof updateGamePlatformValidator>, 'params'>

@inject()
export default class GamePlatformService {
  public async storeOrUpdate(data: updatedData, platformId?: number | undefined) {
    let platform = new GamePlatform()
    if (platformId) {
      platform = await GamePlatform.findOrFail(platformId)
    }
    await platform.merge(data).save()
  }

  public async delete(platformId: number): Promise<void> {
    const platform = await GamePlatform.findOrFail(platformId)

    await platform.delete()
  }
}
