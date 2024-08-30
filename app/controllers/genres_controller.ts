import GenreService from '#services/genre_service'
import { createGenreValidator, updateGenreValidator } from '#validators/genre_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class GamesController {
  constructor(readonly genreService: GenreService) {}

  public async addOneGenre({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createGenreValidator)
      const genre = await this.genreService.addOne(data)
      return response.status(201).json(genre)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async updateOneGenre({ params, request, response }: HttpContext) {
    const genreId = params.genreId

    try {
      const data = await request.validateUsing(updateGenreValidator)
      const genre = await this.genreService.updateOne(data, genreId)
      return response.status(201).json(genre)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async deleteOneGenre({ params, response }: HttpContext) {
    const genreId = params.genreId

    try {
      await this.genreService.deleteOne(genreId)
      return response.status(202)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }
}
