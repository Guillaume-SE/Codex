import type { IBookInfos } from '#interfaces/media_infos_interface'
import Media from '#models/media'
import { inject } from '@adonisjs/core'

@inject()
export default class BookService {
  // async addBookInfos(datas: IBookInfos, mediaId: number) {
  // const media = await Media.find(mediaId)
  // if (!media) {
  //   throw new Error('Media non trouvé')
  // }
  // await media.related('bookInfo').create(datas)
  // }

  async getAllBooks() {
    const datas = await Media.query()
      .from('media')
      .join('books_infos', 'media.id', '=', 'books_infos.media_id')
      .join('reviews', 'media.id', '=', 'reviews.media_id')
      .join('covers', 'media.id', '=', 'covers.media_id')
      .select(
        'media.id',
        'media.media_parent_id',
        'media.name',
        'media.type',
        'media.released',
        'media.synopsis',
        'covers.filename',
        'covers.filename_raw',
        'covers.alternative',
        'books_infos.author',
        'books_infos.illustrator',
        'books_infos.editor',
        'books_infos.pages',
        'reviews.status',
        'reviews.rating',
        'reviews.opinion',
        'reviews.is_favorite',
        'reviews.created_at',
        'reviews.updated_at'
      )
    const books = datas.map((data) => {
      const { id, mediaParentId, name, type, released, synopsis } = data
      const {
        filename,
        filename_raw: filenameRaw,
        alternative,
        author,
        illustrator,
        editor,
        pages,
        status,
        rating,
        opinion,
        is_favorite: isFavorite,
        created_at: createdAt,
        updated_at: updatedAt,
      } = data.$extras

      return {
        book: {
          id,
          mediaParentId,
          type,
          name,
          released,
          synopsis,
          author,
          illustrator,
          editor,
          pages,
        },
        cover: {
          filename,
          filenameRaw,
          alternative,
        },
        review: {
          status,
          rating,
          opinion,
          isFavorite,
          createdAt,
          updatedAt,
        },
      }
    })

    return books
  }

  async getOneBookByMediaId(mediaId: number) {
    const datas = await Media.query()
      .from('media')
      .join('books_infos', 'media.id', '=', 'books_infos.media_id')
      .join('reviews', 'media.id', '=', 'reviews.media_id')
      .join('covers', 'media.id', '=', 'covers.media_id')
      .select(
        'media.id',
        'media.media_parent_id',
        'media.name',
        'media.type',
        'media.released',
        'media.synopsis',
        'covers.filename',
        'covers.filename_raw',
        'covers.alternative',
        'books_infos.author',
        'books_infos.illustrator',
        'books_infos.editor',
        'books_infos.pages',
        'reviews.status',
        'reviews.rating',
        'reviews.opinion',
        'reviews.is_favorite',
        'reviews.created_at',
        'reviews.updated_at'
      )
      .where('media.id', '=', mediaId)

    const noBookFound = datas.length === 0
    if (noBookFound) {
      throw new Error("Aucun livre correspondant n'a été trouvé")
    }
    const book = datas.map((data) => {
      const { id, mediaParentId, name, type, released, synopsis } = data
      const {
        filename,
        filename_raw: filenameRaw,
        alternative,
        author,
        illustrator,
        editor,
        pages,
        status,
        rating,
        opinion,
        is_favorite: isFavorite,
        created_at: createdAt,
        updated_at: updatedAt,
      } = data.$extras

      return {
        book: {
          id,
          mediaParentId,
          name,
          type,
          released,
          synopsis,
          author,
          illustrator,
          editor,
          pages,
        },
        cover: {
          filename,
          filenameRaw,
          alternative,
        },
        review: {
          status,
          rating,
          opinion,
          isFavorite,
          createdAt,
          updatedAt,
        },
      }
    })
    return book
  }
}
