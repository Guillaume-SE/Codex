import Contributor from '#models/contributor'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Contributor.createMany([
      {
        name: 'Steven Spielberg',
      },
      {
        name: 'Bungie',
      },
      {
        name: 'Mappa',
      },
      {
        name: 'Masashi Kishimoto',
      },
      {
        name: 'Microsoft',
      },
      {
        name: 'Kana',
      },
      {
        name: 'Rocksteady',
      },
      {
        name: 'Christopher Nolan',
      },
      {
        name: 'Gearbox',
      },
      {
        name: 'Marvel Studios',
      },
    ])
  }
}
