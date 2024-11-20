import MediaType from '#models/media_type'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class MediaTypeSeeder extends BaseSeeder {
  async run() {
    const uniqueKey = 'name'

    await MediaType.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        name: 'jeu de base',
      },
      {
        id: 2,
        name: 'extension',
      },
      {
        id: 3,
        name: 'film',
      },
      {
        id: 4,
        name: 'saison principale',
      },
      {
        id: 5,
        name: 'épisode spécial',
      },
      {
        id: 6,
        name: 'roman',
      },
      {
        id: 7,
        name: 'manga',
      },
    ])
  }
}
