import type { IMedia } from '#interfaces/media_interface'
import { inject } from '@adonisjs/core'

@inject()
export default class GameService {
  public async getList(mediaList: IMedia[]) {
    const gamesList = mediaList.filter((media) => media.category === 'Jeu vidéo')

    return gamesList
  }
}
