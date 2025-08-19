import Genre from '#models/genre'
import MediaCategory from '#models/media_category'
import MediaType from '#models/media_type'
import type { MediaCategories } from '#types/MediaCategories'
import { typesAndGenresAssociationValidator } from '#validators/media_category_validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type updatedData = Omit<Infer<typeof typesAndGenresAssociationValidator>, 'params'>

@inject()
export default class MediaCategoryService {
  public async associateTypesAndGenres(data: updatedData, categoryId: number) {
    const category = await MediaCategory.findOrFail(categoryId)

    await category.related('genres').sync(data.genres)
    await category.related('types').sync(data.types)
  }

  public async getCategoryTypes(category: MediaCategories) {
    return await MediaType.query()
      .select('id', 'name')
      .whereHas('categories', (categoryQuery) => {
        categoryQuery.where('name', category)
      })
      .orderBy('name')
  }

  public async getCategoryGenres(category: MediaCategories) {
    return await Genre.query()
      .select('id', 'name')
      .whereHas('categories', (categoryQuery) => {
        categoryQuery.where('name', category)
      })
      .orderBy('name')
  }

  public async getCategoriesWithRelations() {
    return await MediaCategory.query().preload('types').preload('genres')
  }
}
