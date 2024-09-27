import type { IMedia } from '#interfaces/media_interface'
import { inject } from '@adonisjs/core'

@inject()
export default class AnimeService {
  public async getAllAnime(mediaList: IMedia[]) {
    const animeList = mediaList.filter((media) => media.category === 'Anime')

    return animeList
  }
}
