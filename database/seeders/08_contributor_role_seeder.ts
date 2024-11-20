import ContributorRole from '#models/contributor_role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const uniqueKey = 'name'

    await ContributorRole.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        name: 'Réalisateur',
      },
      {
        id: 2,
        name: 'Scénariste',
      },
      {
        id: 3,
        name: 'Producteur',
      },
      {
        id: 4,
        name: 'Développeur',
      },
      {
        id: 5,
        name: 'Editeur',
      },
      {
        id: 6,
        name: 'Animation',
      },
      {
        id: 7,
        name: 'Edition',
      },
      {
        id: 8,
        name: 'Auteur',
      },
    ])
  }
}
