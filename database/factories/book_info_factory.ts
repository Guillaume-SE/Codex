import { MediaFactory } from '#database/factories/media_factory'
import BookInfo from '#models/book_info'
import factory from '@adonisjs/lucid/factories'

export const BookInfoFactory = factory
  .define(BookInfo, async ({ faker }) => {
    return {
      pages:
        faker.helpers.maybe(() => faker.number.int({ min: 100, max: 1000 }), {
          probability: 0.7,
        }) ?? null,
    }
  })
  .relation('media', () => MediaFactory)
  .build()
