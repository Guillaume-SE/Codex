import { AlreadyExistError, WrongMediaTypeError } from '#app/exceptions/CustomError'
import CreateBookValidator from '#app/validators/CreateBookValidator'
import UpdateBookValidator from '#app/validators/UpdateBookValidator'
import BookService from '#services/BookService'
import CoverService from '#services/CoverService'
import MediaService from '#services/MediaService'
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
      if (error instanceof AlreadyExistError || error instanceof WrongMediaTypeError) {
        return response.status(400).json({
          name: error.name,
          message: error.message,
        })
      }
      console.error(error)
    }
  }

  public async updateOneBook({ request, params, response }: HttpContext) {
    const mediaId = params.id
    const payloadValidation = await request.validate(UpdateBookValidator)
    try {
      const book = await this.bookService.updateOneBook(payloadValidation, mediaId)

      return response.status(201).json(book)
    } catch (error) {
      if (error instanceof AlreadyExistError || error instanceof WrongMediaTypeError) {
        return response.status(400).json({
          name: error.name,
          message: error.message,
        })
      }
      console.error(error)
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
    } catch (NotFoundError) {
      return response
        .status(404)
        .json({ error_name: NotFoundError.name, error_message: NotFoundError.message })
    }
  }
}
