import MediaCategory from '#models/media_category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class MediaCategorySeeder extends BaseSeeder {
  async run() {
    await MediaCategory.createMany([
      {
        id: 1,
        name: 'Jeu',
      },
      {
        id: 2,
        name: 'Livre',
      },
      {
        id: 3,
        name: 'Anime',
      },
      {
        id: 4,
        name: 'Série',
      },
      {
        id: 5,
        name: 'Film',
      },
    ])
  }
}
