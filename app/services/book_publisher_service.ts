import BookPublisher from '#models/book_publisher'
import { updateBookPublisherValidator } from '#validators/book_publisher_validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type updatedData = Infer<typeof updateBookPublisherValidator>

@inject()
export default class BookPublisherService {
  public async storeOrUpdate(data: updatedData, publisherId?: number | undefined) {
    const publisher = publisherId
      ? await BookPublisher.findOrFail(publisherId)
      : new BookPublisher()

    await publisher.merge(data).save()
  }

  public async delete(publisherId: number): Promise<string> {
    const publisher = await BookPublisher.findOrFail(publisherId)
    const publisherName = publisher.name

    await publisher.delete()

    return publisherName
  }

  static async getFiltered(filters: { search?: string }, page: number = 1, results: number = 10) {
    const mediaQuery = await BookPublisher.query()
      .if(filters.search, (q) => {
        q.where((subQuery) => {
          subQuery.where('name', 'like', `%${filters.search}%`)
        })
      })
      .withCount('bookInfo')
      .orderBy('name', 'asc')
      .paginate(page, results)

    return mediaQuery
  }
}
