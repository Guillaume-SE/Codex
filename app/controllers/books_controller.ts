import BookService from '#services/book_service'
import MediaService from '#services/media_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class BooksController {
  constructor(
    readonly mediaService: MediaService,
    readonly bookService: BookService
  ) {}

  public async index({ inertia, response }: HttpContext) {
    try {
      const mediaList = await this.mediaService.getMediaList()
      const booksList = await this.bookService.getList(mediaList)

      return inertia.render('books/BooksList', { booksList })
    } catch (error) {
      return response.status(404).json(error)
    }
  }
}
