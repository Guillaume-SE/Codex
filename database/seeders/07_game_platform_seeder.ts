import GamePlatform from '#models/game_platform'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class GamePlatformSeeder extends BaseSeeder {
  async run() {
    const uniqueKey = 'name'

    await GamePlatform.updateOrCreateMany(uniqueKey, [
      {
        name: 'Xbox',
      },
      {
        name: 'PC',
      },
      {
        name: 'PlayStation 2',
      },
      {
        name: 'Game Boy Advance',
      },
      {
        name: 'PSP',
      },
      {
        name: 'Xbox 360',
      },
      {
        name: 'Xbox One',
      },
    ])
  }
}
