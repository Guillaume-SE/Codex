import MovieService from '#services/movie_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MoviesController {
  constructor(readonly movieService: MovieService) {}

  public async getAllMovies({ response }: HttpContext) {
    const movies = await this.movieService.getAllMovies()
    return response.status(201).json(movies)
  }

  public async getOneMovieByMediaId({ params, response }: HttpContext) {
    const mediaId = params.mediaId

    try {
      const movie = await this.movieService.getOneMovieByMediaId(mediaId)
      return response.status(200).json(movie)
    } catch (error) {
      return response.status(404).json({ errorName: error.name, errorMessage: error.message })
    }
  }
}
