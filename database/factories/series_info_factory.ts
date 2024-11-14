import { MediaFactory } from '#database/factories/media_factory'
import SeriesInfo from '#models/series_info'
import factory from '@adonisjs/lucid/factories'

export const SeriesInfoFactory = factory
  .define(SeriesInfo, async ({ faker }) => {
    return {
      seriesSeasonLength:
        faker.helpers.maybe(() => faker.number.int({ min: 1, max: 300 }), { probability: 0.7 }) ??
        null,
    }
  })
  .relation('media', () => MediaFactory)
  .build()
