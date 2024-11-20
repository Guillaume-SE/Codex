import GenreService from '#services/genre_service'
import {
  createGenreValidator,
  deleteGenreValidator,
  updateGenreValidator,
} from '#validators/genre_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class GenresController {
  constructor(readonly genreService: GenreService) {}

  public async addOne({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createGenreValidator)
      const genre = await this.genreService.store(data)

      return response.status(201).json(genre)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async updateOne({ params, request, response }: HttpContext) {
    const genreId = params.genreId

    try {
      const { params, ...data } = await request.validateUsing(updateGenreValidator)
      const genre = await this.genreService.update(data, genreId)

      return response.status(201).json(genre)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async deleteOne({ request, params, response }: HttpContext) {
    const genreId = params.genreId

    try {
      await request.validateUsing(deleteGenreValidator)

      await this.genreService.delete(genreId)

      return response.status(202)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }
}
