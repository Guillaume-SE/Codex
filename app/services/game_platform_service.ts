import type { IGamePlatform } from '#interfaces/game_platform_interface'
import GamePlatform from '#models/game_platform'
import { inject } from '@adonisjs/core'

@inject()
export default class GamePlatformService {
  public async store(platform: IGamePlatform): Promise<GamePlatform> {
    const newPlatform = await GamePlatform.create(platform)

    return newPlatform
  }

  public async update(updatedPlatform: IGamePlatform, platformId: number): Promise<GamePlatform> {
    const platform = await GamePlatform.findOrFail(platformId)

    await platform.merge(updatedPlatform).save()

    return platform
  }

  public async delete(platformId: number): Promise<void> {
    const platform = await GamePlatform.findOrFail(platformId)

    await platform.delete()
  }
}
