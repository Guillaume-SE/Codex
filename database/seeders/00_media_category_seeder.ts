import MediaCategoriesEnum from '#enums/media_categories'
import MediaCategory from '#models/media_category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class MediaCategorySeeder extends BaseSeeder {
  async run() {
    await MediaCategory.createMany([
      // all mandatory
      {
        id: MediaCategoriesEnum.GAME,
        name: 'game',
      },
      {
        id: MediaCategoriesEnum.MOVIE,
        name: 'movie',
      },
      {
        id: MediaCategoriesEnum.SERIES,
        name: 'series',
      },
      {
        id: MediaCategoriesEnum.ANIME,
        name: 'anime',
      },
      {
        id: MediaCategoriesEnum.BOOK,
        name: 'book',
      },
    ])
  }
}
