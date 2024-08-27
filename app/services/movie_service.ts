import type { IMedia } from '#interfaces/media_interface'
import { inject } from '@adonisjs/core'

@inject()
export default class MovieService {
  public async getAllMovies(mediaList: IMedia[]) {
    const moviesList = mediaList.filter((media) => media.category === 'Film')

    return moviesList
  }
}
