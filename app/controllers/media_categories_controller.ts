import Genre from '#models/genre'
import MediaCategory from '#models/media_category'
import MediaType from '#models/media_type'
import MediaCategoryService from '#services/media_category_service'
import { categoryAssociationValidator } from '#validators/media_category_validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MediaCategoriesController {
  constructor(readonly mediaCategoryService: MediaCategoryService) {}

  public async showManage({ inertia }: HttpContext) {
    const typesList = await MediaType.query().orderBy('name', 'asc')
    const genresList = await Genre.query().orderBy('name', 'asc')
    const categories = await MediaCategory.query()
      .preload('types')
      .preload('genres')
      .orderBy('name', 'asc')

    const presentedCategories = categories.map((category) => {
      return {
        id: category.id,
        name: category.name,
        typeIds: category.types.map((t) => t.id),
        genreIds: category.genres.map((g) => g.id),
      }
    })

    return inertia.render('admin/ManageCategoryAssociation', {
      categories: presentedCategories,
      typesList,
      genresList,
    })
  }

  public async associate({ params, session, response, request }: HttpContext) {
    const data = await request.validateUsing(categoryAssociationValidator)
    const category = await this.mediaCategoryService.associate(data, params.categoryId)

    session.flash('success', `${category}: liste modifiée avec succès`)
    return response.redirect().toRoute('categories.manage')
  }
}
