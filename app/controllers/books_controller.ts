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

  public async getAllBooks({ response }: HttpContext) {
    try {
      const mediaList = await this.mediaService.getMediaList()
      const booksList = await this.bookService.getAllBooks(mediaList)
      return response.status(200).json(booksList)
    } catch (error) {
      return response.status(404).json(error)
    }
  }
}
