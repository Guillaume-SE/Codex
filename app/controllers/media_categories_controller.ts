import Genre from '#models/genre'
import MediaCategory from '#models/media_category'
import MediaType from '#models/media_type'
import MediaCategoryService from '#services/media_category_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

interface ICategoriesType {
  category_id: number
  type_id: number
  name: string
}
interface ICategoriesGenre {
  category_id: number
  genre_id: number
  name: string
}

@inject()
export default class MediaCategoriesController {
  constructor(readonly mediaCategoryService: MediaCategoryService) {}

  public async showManage({ inertia }: HttpContext) {
    const categoriesList = await MediaCategory.query().orderBy('name', 'asc')
    const typesList = await MediaType.query().orderBy('name', 'asc')
    const genresList = await Genre.query().orderBy('name', 'asc')
    const categoriesTypes = await this.mediaCategoryService.getCategoriesTypes()
    const categoriesGenres = await this.mediaCategoryService.getCategoriesGenres()

    const mapCategoryAssociations = (
      categoriesTypes: ICategoriesType[],
      categoriesGenres: ICategoriesGenre[]
    ) => {
      const result: Record<string, { types: number[]; genres: number[] }> = {}

      const ensureCategory = (categoryId: number | string) => {
        const key = String(categoryId)
        if (!result[key]) {
          result[key] = { types: [], genres: [] }
        }
        return result[key]
      }

      for (const { category_id, type_id } of categoriesTypes) {
        ensureCategory(category_id).types.push(type_id)
      }

      for (const { category_id, genre_id } of categoriesGenres) {
        ensureCategory(category_id).genres.push(genre_id)
      }

      return result
    }

    const categoriesTypesGenresPaired = mapCategoryAssociations(categoriesTypes, categoriesGenres)

    return inertia.render('admin/ManageCategoryAssociation', {
      categoriesList,
      typesList,
      genresList,
      categoriesTypesGenresPaired,
    })
  }
}
