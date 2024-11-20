import Tag from '#models/tag'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const uniqueKey = 'name'

    await Tag.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        // mandatory
        name: 'autre',
      },
      {
        name: 'family',
      },
      {
        name: 'summer',
      },
      {
        name: 'winter',
      },
      {
        name: 'fall',
      },
      {
        name: 'spring',
      },
    ])
  }
}
