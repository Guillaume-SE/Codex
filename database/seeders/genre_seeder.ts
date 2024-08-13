import Genre from '#models/genre'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class GenreSeeder extends BaseSeeder {
  async run() {
    await Genre.createMany([
      {
        id: 1,
        name: 'FPS',
        categoryId: 1,
      },
      {
        id: 2,
        name: 'Comédie',
        categoryId: 2,
      },
      {
        id: 3,
        name: 'Isekai',
        categoryId: 3,
      },
      {
        id: 4,
        name: 'Suspense',
        categoryId: 4,
      },
      {
        id: 5,
        name: 'Action',
        categoryId: 5,
      },
      {
        id: 6,
        name: 'Action',
        categoryId: 1,
      },
    ])
  }
}
