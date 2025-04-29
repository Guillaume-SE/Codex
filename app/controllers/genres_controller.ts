import Genre from '#models/genre'
import GenreService from '#services/genre_service'
import {
  createGenreValidator,
  genreValidator,
  updateGenreValidator,
} from '#validators/genre_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class GenresController {
  constructor(readonly genreService: GenreService) {}

  async showManage({ inertia }: HttpContext) {
    const genreList: Genre[] = await Genre.query().orderBy('name', 'asc')

    return inertia.render('admin/ManageGenre', {
      genreList,
    })
  }

  public async storeOrUpdate({ request, response }: HttpContext) {
    // for update
    if (request.params().genreId) {
      const { params, ...data } = await request.validateUsing(updateGenreValidator)
      await this.genreService.storeOrUpdate(data, params.genreId)
      return response.redirect().toRoute('genre.manage')
    }
    // for create
    const data = await request.validateUsing(createGenreValidator)
    await this.genreService.storeOrUpdate(data)

    return response.redirect().toRoute('genre.manage')
  }

  public async deleteOne({ request, response }: HttpContext) {
    const { params } = await request.validateUsing(genreValidator)
    await this.genreService.delete(params.genreId)

    return response.redirect().toRoute('genre.manage')
  }
}
