import { IBaseMediaFormatted } from '#interfaces/media_formatted_interface'
import { inject } from '@adonisjs/core'

@inject()
export default class GameService {
  public async getList(mediaList: IBaseMediaFormatted[]) {
    const gamesList = mediaList.filter((media) => media.category === 'Jeu')

    return gamesList
  }
}
