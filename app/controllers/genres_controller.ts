import { ListPresenter } from '#classes/ListPresenter'
import type Genre from '#models/genre'
import GenreService from '#services/genre_service'
import { searchValidator } from '#validators/dashboard_validator'
import { createGenreValidator, updateGenreValidator } from '#validators/genre_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class GenresController {
  constructor(readonly genreService: GenreService) {}

  async showManage({ request, inertia }: HttpContext) {
    const page = request.input('page')
    const filters = await request.validateUsing(searchValidator)
    const genreList = await GenreService.getFiltered(filters, page, 10)

    genreList.baseUrl('/admin/genres/manage')

    const genreMapper = (genre: Genre) => {
      return {
        id: genre.id,
        name: genre.name,
        count: genre.$extras.media_count,
      }
    }

    const listPresenter = new ListPresenter()
    const presentedGenreList = listPresenter.present(genreList, genreMapper)

    return inertia.render('admin/ManageGenre', {
      genreList: presentedGenreList,
    })
  }

  async store({ request, session, response }: HttpContext) {
    const data = await request.validateUsing(createGenreValidator)
    await this.genreService.storeOrUpdate(data)

    session.flash('success', `${data.name} ajouté avec succès`)
    return response.redirect().toRoute('genres.index')
  }

  async update({ params, request, session, response }: HttpContext) {
    const data = await request.validateUsing(updateGenreValidator, {
      meta: { params: params },
    })
    await this.genreService.storeOrUpdate(data, params.genreId)

    session.flash('success', `${data.name} modifié avec succès`)
    return response.redirect().toRoute('genres.index')
  }

  public async destroy({ params, session, response }: HttpContext) {
    const genreDeleted = await this.genreService.delete(params.genreId)

    session.flash('success', `${genreDeleted} supprimé avec succès`)

    return response.redirect().toRoute('genres.index')
  }
}
