import { ICompleteMedia } from '#interfaces/media_interface'
import { inject } from '@adonisjs/core'

@inject()
export default class AnimeService {
  public async getAllAnime(mediaList: Array<ICompleteMedia>) {
    const animeList = mediaList.filter((media) => media.category === 'Animé')

    return animeList
  }
}
