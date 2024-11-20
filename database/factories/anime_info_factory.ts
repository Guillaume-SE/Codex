import { MediaFactory } from '#database/factories/media_factory'
import AnimeInfo from '#models/anime_info'
import factory from '@adonisjs/lucid/factories'

export const AnimeInfoFactory = factory
  .define(AnimeInfo, async ({ faker }) => {
    return {
      animeSeasonLength:
        faker.helpers.maybe(() => faker.number.int({ min: 1, max: 500 }), { probability: 0.7 }) ??
        null,
    }
  })
  .relation('media', () => MediaFactory)
  .build()
