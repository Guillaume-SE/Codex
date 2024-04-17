import { AlreadyExistError, WrongMediaTypeError } from '#app/exceptions/CustomError'
import CreateMovieValidator from '#app/validators/CreateMovieValidator'
import UpdateMovieValidator from '#app/validators/UpdateMovieValidator'
import CoverService from '#services/CoverService'
import MediaService from '#services/MediaService'
import MovieService from '#services/MovieService'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MoviesController {
  constructor(
    protected mediaService: MediaService,
    protected movieService: MovieService,
    protected coverService: CoverService
  ) {}

  public async addOneMovie({ request, response }: HttpContext) {
    const payloadValidation = await request.validate(CreateMovieValidator)
    try {
      const newMedia = await this.movieService.addOneMovie(payloadValidation)
      return response.status(201).json(newMedia)
    } catch (error) {
      if (error instanceof AlreadyExistError || error instanceof WrongMediaTypeError) {
        return response.status(400).json({
          name: error.name,
          message: error.message,
        })
      }
      console.error(error)
    }
  }

  public async updateOneMovie({ request, params, response }: HttpContext) {
    const mediaId = params.id
    const payloadValidation = await request.validate(UpdateMovieValidator)
    try {
      const movie = await this.movieService.updateOneMovie(payloadValidation, mediaId)

      return response.status(201).json(movie)
    } catch (error) {
      if (error instanceof AlreadyExistError || error instanceof WrongMediaTypeError) {
        return response.status(400).json({
          name: error.name,
          message: error.message,
        })
      }
      console.error(error)
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
    } catch (NotFoundError) {
      return response
        .status(404)
        .json({ error_name: NotFoundError.name, error_message: NotFoundError.message })
    }
  }
}
