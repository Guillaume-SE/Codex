import { ICompleteMedia } from '#interfaces/media_interface'
import { inject } from '@adonisjs/core'

@inject()
export default class GameService {
  public async getAllGames(mediaList: Array<ICompleteMedia>) {
    const gamesList = mediaList.filter((media) => media.category === 'Jeu vidéo')

    return gamesList
  }
}
