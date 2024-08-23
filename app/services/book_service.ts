import { ICompleteMedia } from '#interfaces/media_interface'
import { inject } from '@adonisjs/core'

@inject()
export default class BookService {
  public async getAllBooks(mediaList: Array<ICompleteMedia>) {
    const booksList = mediaList.filter((media) => media.category === 'Livre')

    return booksList
  }
}
