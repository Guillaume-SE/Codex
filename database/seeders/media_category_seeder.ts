import MediaCategory from '#models/media_category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class MediaCategorySeeder extends BaseSeeder {
  async run() {
    await MediaCategory.createMany([
      {
        id: 1,
        name: 'game',
      },
      {
        id: 2,
        name: 'book',
      },
      {
        id: 3,
        name: 'anime',
      },
      {
        id: 4,
        name: 'series',
      },
      {
        id: 5,
        name: 'movie',
      },
    ])
  }
}
