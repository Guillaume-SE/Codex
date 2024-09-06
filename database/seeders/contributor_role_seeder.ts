import ContributorRole from '#models/contributor_role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await ContributorRole.createMany([
      {
        id: 1,
        name: 'Réalisateur',
      },
      {
        id: 2,
        name: 'Studio de développement',
      },
      {
        id: 3,
        name: "Studio d'animation",
      },
      {
        id: 4,
        name: 'Auteur',
      },
    ])
  }
}
