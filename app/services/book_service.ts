import type { IBaseMediaFormatted } from '#interfaces/media_formatted_interface'
import { inject } from '@adonisjs/core'

@inject()
export default class BookService {
  public async getList(mediaList: IBaseMediaFormatted[]) {
    const booksList = mediaList.filter((media) => media.category === 'Livre')

    return booksList
  }
}
