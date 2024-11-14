import { MediaFactory } from '#database/factories/media_factory'
import MovieInfo from '#models/movie_info'
import factory from '@adonisjs/lucid/factories'

export const MovieInfoFactory = factory
  .define(MovieInfo, async ({ faker }) => {
    return {
      duration:
        faker.helpers.maybe(() => faker.number.int({ min: 30, max: 180 }), { probability: 0.7 }) ??
        null,
    }
  })
  .relation('media', () => MediaFactory)
  .build()
