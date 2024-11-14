import MediaCategoriesEnum from '#enums/media_categories'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    await db.table('category_types').insert([
      { category_id: MediaCategoriesEnum.GAME, type_id: 1 },
      { category_id: MediaCategoriesEnum.GAME, type_id: 2 },
      { category_id: MediaCategoriesEnum.MOVIE, type_id: 3 },
      { category_id: MediaCategoriesEnum.SERIES, type_id: 4 },
      { category_id: MediaCategoriesEnum.SERIES, type_id: 5 },
      { category_id: MediaCategoriesEnum.ANIME, type_id: 3 },
      { category_id: MediaCategoriesEnum.ANIME, type_id: 4 },
      { category_id: MediaCategoriesEnum.BOOK, type_id: 6 },
      { category_id: MediaCategoriesEnum.BOOK, type_id: 7 },
    ])
  }
}
