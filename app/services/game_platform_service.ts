import type { IGamePlatform } from '#interfaces/game_platform_interface'
import GameInfo from '#models/game_info'
import GamePlatform from '#models/game_platform'
import Media from '#models/media'
import { inject } from '@adonisjs/core'

@inject()
export default class GamePlatformService {
  public async addOnePlatform(platform: IGamePlatform) {
    const existingSamePlatform = await GamePlatform.findBy('name', platform.name)
    if (existingSamePlatform) {
      throw new Error('Cette plateforme a déjà été ajoutée')
    }

    const newPlatform = await GamePlatform.create(platform)

    return newPlatform
  }

  public async updateOnePlatform(updatedPlatform: IGamePlatform, platformId: number) {
    const validSelectedPlatform = await GamePlatform.find(platformId)
    if (!validSelectedPlatform) {
      throw new Error("La plateforme selectionnée n'existe pas")
    }
    const isUpdatedPlatformAlreadyExist = await GamePlatform.findBy('name', updatedPlatform.name)
    if (isUpdatedPlatformAlreadyExist) {
      throw new Error('Cette plateforme a déjà été ajoutée')
    }
    await validSelectedPlatform.merge(updatedPlatform).save()

    return updatedPlatform
  }

  public async deleteOnePlatform(platformId: number) {
    const validSelectedPlatform = await GamePlatform.find(platformId)
    if (!validSelectedPlatform) {
      throw new Error("La plateforme selectionnée n'existe pass")
    }
    const mediaUsingSelectedPlatform = await GameInfo.findBy('platformId', validSelectedPlatform.id)
    if (mediaUsingSelectedPlatform) {
      throw new Error(
        'Impossible de supprimer car un ou plusieurs media utilisent cette plateforme'
      )
    }
    await validSelectedPlatform.delete()
  }
}
