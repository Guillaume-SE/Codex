import BookPublisher from '#models/book_publisher'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class BookPublisherSeeder extends BaseSeeder {
  async run() {
    const uniqueKey = 'name'

    await BookPublisher.updateOrCreateMany(uniqueKey, [
      {
        name: 'Kana',
      },
      {
        name: 'Kurokawa',
      },
      {
        name: 'Ki-oon',
      },
      {
        name: 'Glénat',
      },
      {
        name: 'Bragelonne',
      },
      {
        name: 'Pika',
      },
      {
        name: 'Panini',
      },
    ])
  }
}
