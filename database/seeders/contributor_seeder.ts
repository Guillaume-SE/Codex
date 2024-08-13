import Contributor from '#models/contributor'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Contributor.createMany([
      {
        id: 1,
        name: 'Steven Spielberg',
      },
      {
        id: 2,
        name: 'Bungie',
      },
      {
        id: 3,
        name: 'Mappa',
      },
      {
        id: 4,
        name: 'Masashi Kishimoto',
      },
    ])
  }
}
