import type { IBaseMediaFormatted } from '#interfaces/media_formatted_interface'
import { inject } from '@adonisjs/core'

@inject()
export default class MovieService {
  public async getList(mediaList: IBaseMediaFormatted[]) {
    const moviesList = mediaList.filter((media) => media.category === 'Film')

    return moviesList
  }
}
