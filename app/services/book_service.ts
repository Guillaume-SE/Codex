import type { IMedia } from '#interfaces/media_interface'
import { inject } from '@adonisjs/core'

@inject()
export default class BookService {
  public async getAllBooks(mediaList: IMedia[]) {
    const booksList = mediaList.filter((media) => media.category === 'Livre')

    return booksList
  }
}
