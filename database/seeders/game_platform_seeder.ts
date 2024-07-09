import GamePlatform from '#models/game_platform'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class GamePlatformSeeder extends BaseSeeder {
  async run() {
    await GamePlatform.createMany([
      {
        id: 1,
        name: 'Xbox',
      },
      {
        id: 2,
        name: 'PC',
      },
      {
        id: 3,
        name: 'PlayStation 5',
      },
      {
        id: 4,
        name: 'Mobile',
      },
      {
        id: 5,
        name: 'Nintendo Switch',
      },
    ])
  }
}
