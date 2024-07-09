import BookService from '#services/book_service'
import CoverService from '#services/cover_service'
import MediaService from '#services/media_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class BooksController {
  constructor(
    readonly mediaService: MediaService,
    readonly bookService: BookService,
    readonly coverService: CoverService
  ) {}

  public async getAllBooks({ response }: HttpContext) {
    const books = await this.bookService.getAllBooks()
    return response.status(201).json(books)
  }

  public async getOneBookByMediaId({ params, response }: HttpContext) {
    const mediaId = params.mediaId
    try {
      const book = await this.bookService.getOneBookByMediaId(mediaId)
      return response.status(200).json(book)
    } catch (error) {
      return response.status(404).json(error)
    }
  }
}
