import Job from '#models/job'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Job.createMany([
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
