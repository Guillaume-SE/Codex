import MediaStatus from '#models/media_status'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class MediaStatusSeeder extends BaseSeeder {
  async run() {
    await MediaStatus.createMany([
      {
        id: 1,
        name: 'terminé',
      },
      {
        id: 2,
        name: 'en cours',
      },
      {
        id: 3,
        name: 'en pause',
      },
      {
        id: 4,
        name: 'abandonné',
      },
      {
        id: 5,
        name: 'prévu',
      },
      {
        id: 6,
        name: 'attendu',
      },
    ])
  }
}
