import ReviewStatuses from '#models/review_statuses'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class ReviewStatusSeeder extends BaseSeeder {
  async run() {
    await ReviewStatuses.createMany([
      {
        id: 1,
        name: 'Attendu',
      },
      {
        id: 2,
        name: 'Prévu',
      },
      {
        id: 3,
        name: 'En cours',
      },
      {
        id: 4,
        name: 'Terminé',
      },
      {
        id: 5,
        name: 'En pause',
      },
      {
        id: 6,
        name: 'Abandonné',
      },
    ])
  }
}
