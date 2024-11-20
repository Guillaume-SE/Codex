import { MediaFactory } from '#database/factories/media_factory'
import GameInfo from '#models/game_info'
import GamePlatform from '#models/game_platform'
import factory from '@adonisjs/lucid/factories'

export const GameInfoFactory = factory
  .define(GameInfo, async ({ faker }) => {
    const platforms = await GamePlatform.all()
    const platform = faker.helpers.arrayElement(platforms.map((p) => p.id))

    return {
      platformId: faker.helpers.maybe(() => platform, { probability: 0.7 }) ?? null,
    }
  })
  .relation('media', () => MediaFactory)
  .build()
