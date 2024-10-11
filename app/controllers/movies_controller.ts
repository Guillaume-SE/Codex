import MediaService from '#services/media_service'
import MovieService from '#services/movie_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MoviesController {
  constructor(
    readonly movieService: MovieService,
    readonly mediaService: MediaService
  ) {}

  public async getAllMovies({ response }: HttpContext) {
    try {
      const mediaList = await this.mediaService.getMediaList()
      const moviesList = await this.movieService.getAllMovies(mediaList)
      return response.status(200).json(moviesList)
    } catch (error) {
      return response.status(404).json(error)
    }
  }
}
