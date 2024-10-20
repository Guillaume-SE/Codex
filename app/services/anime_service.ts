import type { IBaseMediaFormatted } from '#interfaces/media_formatted_interface'
import { inject } from '@adonisjs/core'

@inject()
export default class AnimeService {
  public async getList(mediaList: IBaseMediaFormatted[]) {
    const animeList = mediaList.filter((media) => media.category === 'Anime')

    return animeList
  }
}
