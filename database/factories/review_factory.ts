import { MediaFactory } from '#database/factories/media_factory'
import Review from '#models/review'
import factory from '@adonisjs/lucid/factories'

export const ReviewFactory = factory
  .define(Review, async ({ faker }) => {
    return {
      rating:
        faker.helpers.maybe(() => faker.number.int({ min: 0, max: 10 }), {
          probability: 0.7,
        }) ?? null,
      // less probability = more chance to be false
      isFavorite: faker.datatype.boolean({ probability: 0.3 }),
    }
  })
  .relation('media', () => MediaFactory)
  .build()
