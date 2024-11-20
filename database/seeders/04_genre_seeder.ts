import Genre from '#models/genre'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class GenreSeeder extends BaseSeeder {
  async run() {
    const uniqueKey = 'name'

    await Genre.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        name: 'FPS',
      },
      {
        id: 2,
        name: 'Comédie',
      },
      {
        id: 3,
        name: 'Isekai',
      },
      {
        id: 4,
        name: 'Suspense',
      },
      {
        id: 5,
        name: 'Action',
      },
      {
        id: 6,
        name: 'Shonen',
      },
      {
        id: 7,
        name: 'Aventure',
      },
      {
        id: 8,
        name: 'Horreur',
      },
      {
        id: 9,
        name: 'RPG',
      },
      {
        id: 10,
        name: 'Course',
      },
    ])
  }
}
