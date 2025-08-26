import { MediaFactory } from '#database/factories/media_factory'
import BookInfo from '#models/book_info'
import BookPublisher from '#models/book_publisher'
import factory from '@adonisjs/lucid/factories'

export const BookInfoFactory = factory
  .define(BookInfo, async ({ faker }) => {
    const publishers = await BookPublisher.all()
    const publisher = faker.helpers.arrayElement(publishers.map((p) => p.id))

    return {
      publisherId: faker.helpers.maybe(() => publisher, { probability: 0.7 }) ?? null,
    }
  })
  .relation('media', () => MediaFactory)
  .build()
