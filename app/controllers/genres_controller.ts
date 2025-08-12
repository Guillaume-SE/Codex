import Genre from '#models/genre'
import GenreService from '#services/genre_service'
import { createGenreValidator, updateGenreValidator } from '#validators/genre_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

interface IGenreListFormatted {
  id: number
  name: string
  count: number
}

@inject()
export default class GenresController {
  constructor(readonly genreService: GenreService) {}

  async showManage({ inertia }: HttpContext) {
    const genreList: Genre[] = await Genre.query().withCount('media').orderBy('name', 'asc')

    const genreListFormatted: IGenreListFormatted[] = genreList.map((genre) => {
      return {
        id: genre.id,
        name: genre.name,
        count: genre.$extras.media_count,
      }
    })

    return inertia.render('admin/ManageGenre', {
      genreList: genreListFormatted,
    })
  }

  public async storeOrUpdate({ params, request, session, response }: HttpContext) {
    // for update
    if (params.genreId) {
      const data = await request.validateUsing(updateGenreValidator)
      await this.genreService.storeOrUpdate(data, params.genreId)

      session.flash('success', `${data.name} modifié avec succès`)

      return response.redirect().toRoute('genre.manage')
    }
    // for create
    const data = await request.validateUsing(createGenreValidator)
    await this.genreService.storeOrUpdate(data)

    session.flash('success', `${data.name} ajouté avec succès`)

    return response.redirect().toRoute('genre.manage')
  }

  public async deleteOne({ params, session, response }: HttpContext) {
    const genreDeleted = await this.genreService.delete(params.genreId)

    session.flash('success', `${genreDeleted} supprimé avec succès`)

    return response.redirect().toRoute('genre.manage')
  }
}
