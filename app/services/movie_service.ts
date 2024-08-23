import { ICompleteMedia } from '#interfaces/media_interface'
import { inject } from '@adonisjs/core'

@inject()
export default class MovieService {
  public async getAllMovies(mediaList: Array<ICompleteMedia>) {
    const moviesList = mediaList.filter((media) => media.category === 'Film')

    return moviesList
  }
}
