import MediaType from '#models/media_type'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class MediaTypeSeeder extends BaseSeeder {
  async run() {
    await MediaType.createMany([
      {
        id: 1,
        name: 'Jeu de base',
        categoryId: 1,
      },
      {
        id: 2,
        name: 'Manga',
        categoryId: 2,
      },
      {
        id: 3,
        name: 'Roman',
        categoryId: 2,
      },
      {
        id: 4,
        name: 'Saison principale',
        categoryId: 3,
      },
      {
        id: 5,
        name: 'Film',
        categoryId: 3,
      },
      {
        id: 6,
        name: 'Saison principale',
        categoryId: 4,
      },
      {
        id: 7,
        name: 'Episode spécial',
        categoryId: 4,
      },
      {
        id: 8,
        name: 'Film',
        categoryId: 5,
      },
    ])
  }
}
