import { createAlternativeText } from '#functions/create_cover_alt_text'
import { IBook } from '#interfaces/media_interface'
import BookInfo from '#models/book_info'
import Media from '#models/media'
import CoverService from '#services/cover_service'
import MediaService from '#services/media_service'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import { PathLike } from 'node:fs'
import { unlink } from 'node:fs/promises'

@inject()
export default class BookService {
  constructor(
    protected mediaService: MediaService,
    protected coverService: CoverService
  ) {}
  protected defaultCoverFilename = env.get('DEFAULT_COVER_FILENAME')
  protected defaultCoverAltText = env.get('DEFAULT_COVER_ALT_TEXT')
  protected coverResizedDir: string | PathLike = env.get('COVER_RESIZED_DIR')
  protected coverRawDir: string | PathLike = env.get('COVER_RAW_DIR')

  async addOneBook(data: IBook) {
    const {
      mediaParentId,
      type,
      cover,
      name,
      released,
      synopsis,
      status,
      rating,
      opinion,
      isFavorite,
      ...specificBookInfos
    } = data

    await this.mediaService.isMediaAlreadyAdded(type, name, released)

    let coverFilename = this.defaultCoverFilename
    let coverRawFilename = null
    let coverAltText = this.defaultCoverAltText
    if (cover) {
      const newCover = await this.coverService.saveCover(type, name, cover.tmpPath)
      coverFilename = newCover.coverFilename
      coverRawFilename = newCover.coverRawFilename
      coverAltText = newCover.coverAltText
    }

    const generalMediaInfos = { mediaParentId, type, name, released, synopsis }
    const coverInfo = {
      filename: coverFilename,
      filenameRaw: coverRawFilename,
      alternative: coverAltText,
    }
    const reviewInfo = { status, rating, opinion, isFavorite }

    const newMedia = await Media.create(generalMediaInfos)
    await newMedia.related('bookInfo').create(specificBookInfos)
    await newMedia.related('cover').create(coverInfo)
    await newMedia.related('review').create(reviewInfo)

    return {
      media: generalMediaInfos,
      book: specificBookInfos,
      cover: coverInfo,
      review: reviewInfo,
    }
  }

  async updateOneBook(datas: IBook, mediaId: number) {
    const media = await this.mediaService.isMediaExist(mediaId)
    if (!media) {
      throw new Error('pas de media')
    }

    const cover = await this.coverService.isCoverExist(mediaId)
    if (!cover) {
      throw new Error('pas de cover')
    }
    const book = await this.isBookExist(mediaId)
    if (!book) {
      throw new Error('pas de livre')
    }
    const { mediaParentId, type, name, released, synopsis, ...specificBookInfos } = datas
    const generalMediaInfos = { mediaParentId, type, name, released, synopsis }

    // update also the cover alt text
    const mediaNameAsChanged = media.name !== datas.name
    const isNotDefaultCover = cover.alternative !== this.defaultCoverAltText
    const newCoverAltText = createAlternativeText(type, name)

    media.merge(generalMediaInfos).save()
    book.merge(specificBookInfos).save()
    if (mediaNameAsChanged && isNotDefaultCover) {
      cover.merge({ alternative: newCoverAltText }).save()
    }

    return { media: generalMediaInfos, book: specificBookInfos, cover: newCoverAltText }
  }

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

  async isBookExist(mediaId: number) {
    const book = await BookInfo.findBy('media_id', mediaId)
    return book
  }
}
