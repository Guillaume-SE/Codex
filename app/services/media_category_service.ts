import Genre from '#models/genre'
import MediaType from '#models/media_type'
import type { MediaCategories } from '#types/MediaCategories'
import { inject } from '@adonisjs/core'

@inject()
export default class MediaCategoryService {
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
}
