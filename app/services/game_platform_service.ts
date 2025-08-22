import GamePlatform from '#models/game_platform'
import { updateGamePlatformValidator } from '#validators/game_platform_validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type updatedData = Infer<typeof updateGamePlatformValidator>

@inject()
export default class GamePlatformService {
  public async storeOrUpdate(data: updatedData, platformId?: number | undefined) {
    const platform = platformId ? await GamePlatform.findOrFail(platformId) : new GamePlatform()

    await platform.merge(data).save()
  }

  public async delete(platformId: number): Promise<string> {
    const platform = await GamePlatform.findOrFail(platformId)
    const platformName = platform.name

    await platform.delete()

    return platformName
  }

  static async getFiltered(filters: { search?: string }, page: number = 1, results: number = 10) {
    const mediaQuery = await GamePlatform.query()
      .if(filters.search, (q) => {
        q.where((subQuery) => {
          subQuery.where('name', 'like', `%${filters.search}%`)
        })
      })
      .withCount('gameInfo')
      .orderBy('name', 'asc')
      .paginate(page, results)

    return mediaQuery
  }
}
