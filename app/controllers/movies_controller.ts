import CoverService from '#services/cover_service'
import MediaService from '#services/media_service'
import MovieService from '#services/movie_service'
import { createMovieValidator, updateMovieValidator } from '#validators/movie_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MoviesController {
  constructor(
    readonly mediaService: MediaService,
    readonly movieService: MovieService,
    readonly coverService: CoverService
  ) {}

  public async addOneMovie({ request, response }: HttpContext) {
    try {
      const payloadValidation = await request.validateUsing(createMovieValidator)
      const newMedia = await this.movieService.addOneMovie(payloadValidation)
      return response.status(201).json(newMedia)
    } catch (error) {
      return response.status(400).json({ error })
    }
  }

  public async updateOneMovie({ request, params, response }: HttpContext) {
    const mediaId = params.mediaId
    try {
      const payloadValidation = await request.validateUsing(updateMovieValidator)
      const movie = await this.movieService.updateOneMovie(payloadValidation, mediaId)

      return response.status(201).json(movie)
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ error })
      }
      return response.status(400).json({ error })
    }
  }

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
