import MediaCategoriesEnum from '#enums/media_categories'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    await db.table('category_genres').insert([
      { category_id: MediaCategoriesEnum.GAME, genre_id: 1 },
      { category_id: MediaCategoriesEnum.GAME, genre_id: 7 },
      { category_id: MediaCategoriesEnum.GAME, genre_id: 9 },
      { category_id: MediaCategoriesEnum.GAME, genre_id: 10 },
      { category_id: MediaCategoriesEnum.MOVIE, genre_id: 2 },
      { category_id: MediaCategoriesEnum.MOVIE, genre_id: 4 },
      { category_id: MediaCategoriesEnum.MOVIE, genre_id: 5 },
      { category_id: MediaCategoriesEnum.MOVIE, genre_id: 7 },
      { category_id: MediaCategoriesEnum.SERIES, genre_id: 4 },
      { category_id: MediaCategoriesEnum.SERIES, genre_id: 5 },
      { category_id: MediaCategoriesEnum.SERIES, genre_id: 7 },
      { category_id: MediaCategoriesEnum.SERIES, genre_id: 8 },
      { category_id: MediaCategoriesEnum.ANIME, genre_id: 2 },
      { category_id: MediaCategoriesEnum.ANIME, genre_id: 3 },
      { category_id: MediaCategoriesEnum.ANIME, genre_id: 5 },
      { category_id: MediaCategoriesEnum.ANIME, genre_id: 7 },
      { category_id: MediaCategoriesEnum.BOOK, genre_id: 2 },
      { category_id: MediaCategoriesEnum.BOOK, genre_id: 6 },
      { category_id: MediaCategoriesEnum.BOOK, genre_id: 7 },
      { category_id: MediaCategoriesEnum.BOOK, genre_id: 8 },
    ])
  }
}
