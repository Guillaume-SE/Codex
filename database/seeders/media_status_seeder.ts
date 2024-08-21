import MediaStatus from '#models/media_status'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class MediaStatusSeeder extends BaseSeeder {
  async run() {
    await MediaStatus.createMany([
      {
        id: 1,
        name: 'Terminé',
      },
      {
        id: 2,
        name: 'En cours',
      },
      {
        id: 3,
        name: 'En pause',
      },
      {
        id: 4,
        name: 'Abandonné',
      },
      {
        id: 5,
        name: 'Prévu',
      },
      {
        id: 6,
        name: 'Attendu',
      },
    ])
  }
}
