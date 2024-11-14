import ContributorRole from '#models/contributor_role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const uniqueKey = 'name'

    await ContributorRole.updateOrCreateMany(uniqueKey, [
      {
        name: 'Réalisateur',
      },
      {
        name: 'Scénariste',
      },
      {
        name: 'Producteur',
      },
      {
        name: 'Développeur',
      },
      {
        name: 'Editeur',
      },
      {
        name: 'Animation',
      },
      {
        name: 'Edition',
      },
      {
        name: 'Auteur',
      },
    ])
  }
}
