import MediaStatus from '#models/media_status'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class MediaStatusSeeder extends BaseSeeder {
  async run() {
    await MediaStatus.createMany([
      {
        id: 1,
        name: 'en cours',
      },
      {
        id: 2,
        name: 'terminé',
      },
      {
        id: 3,
        name: 'en pause',
      },
      {
        id: 4,
        name: 'arrêté',
      },
      {
        id: 5,
        name: 'prévu',
      },
    ])
  }
}
