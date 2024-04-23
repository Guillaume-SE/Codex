import CreateBookValidator from '#app/validators/CreateBookValidator'
import UpdateBookValidator from '#app/validators/UpdateBookValidator'
import BookService from '#services/book_service'
import CoverService from '#services/cover_service'
import MediaService from '#services/media_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class BooksController {
  constructor(
    protected mediaService: MediaService,
    protected bookService: BookService,
    protected coverService: CoverService
  ) {}

  public async addOneBook({ request, response }: HttpContext) {
    const payloadValidation = await request.validate(CreateBookValidator)

    try {
      const newMedia = await this.bookService.addOneBook(payloadValidation)
      return response.status(201).json(newMedia)
    } catch (error) {
      return response.status(400).json({
        name: error.name,
        message: error.message,
      })
    }
  }

  public async updateOneBook({ request, params, response }: HttpContext) {
    const mediaId = params.id
    const payloadValidation = await request.validate(UpdateBookValidator)
    try {
      const book = await this.bookService.updateOneBook(payloadValidation, mediaId)

      return response.status(201).json(book)
    } catch (error) {
      return response.status(400).json({
        errorName: error.name,
        errorMessage: error.message,
      })
    }
  }

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
      return response.status(404).json({ errorName: error.name, errorMessage: error.message })
    }
  }
}
