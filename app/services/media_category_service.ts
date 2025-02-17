import Genre from '#models/genre'
import MediaType from '#models/media_type'
import type { MediaCategories } from '#types/MediaCategories'
import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'

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

  public async getCategoriesTypes() {
    return await db
      .from('category_types')
      .join('media_types', 'category_types.type_id', 'media_types.id')
      .select('category_types.category_id', 'media_types.id', 'media_types.name')
      .orderBy('name')
  }

  public async getCategoriesGenres() {
    return await db
      .from('category_genres')
      .join('genres', 'category_genres.genre_id', 'genres.id')
      .select('category_genres.category_id', 'genres.id', 'genres.name')
      .orderBy('name')
  }
}
