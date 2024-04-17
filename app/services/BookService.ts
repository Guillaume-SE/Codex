import { createAlternativeText } from '#functions/create_cover_alt_text'
import BookInfo from '#models/book_info'
import Media from '#models/media'
import CoverService from '#services/CoverService'
import MediaService from '#services/MediaService'
import env from '#start/env'
import { inject } from '@adonisjs/core'

@inject()
export default class BookService {
  constructor(
    protected mediaService: MediaService,
    protected coverService: CoverService
  ) {}

  async addOneBook(payload) {
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
    } = payload

    await this.mediaService.isMediaAlreadyAdded(type, name, released)

    let coverName = env.get('DEFAULT_COVER_FILENAME')
    let coverAltText = env.get('DEFAULT_COVER_ALT_TEXT')
    if (cover) {
      const newCover = await this.coverService.saveCover(type, name, cover.tmpPath)
      coverName = newCover.coverName
      coverAltText = newCover.coverAltText
    }

    const generalMediaInfos = { mediaParentId, type, name, released, synopsis }
    const coverInfo = { filename: coverName, alternative: coverAltText }
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

  async updateOneBook(payload, mediaId: number) {
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
    const { mediaParentId, type, name, released, synopsis, ...specificBookInfos } = payload
    const generalMediaInfos = { mediaParentId, type, name, released, synopsis }

    // update also the cover alt text
    const mediaNameAsChanged = media.name !== payload.name
    const newCoverAltText = createAlternativeText(type, name)

    // const trx = await Database.transaction()

    media.merge(generalMediaInfos).save()
    book.merge(specificBookInfos).save()
    if (mediaNameAsChanged) {
      cover.merge({ alternative: newCoverAltText }).save()
    }

    // await trx.commit()

    return { media: generalMediaInfos, book: specificBookInfos, cover: newCoverAltText }
  }

  async getAllBooks() {
    const datas = await Media.query()
      .from('medias')
      .join('books_infos', 'medias.id', '=', 'books_infos.media_id')
      .join('reviews', 'medias.id', '=', 'reviews.media_id')
      .join('covers', 'medias.id', '=', 'covers.media_id')
      .select(
        'medias.id',
        'medias.media_parent_id',
        'medias.name',
        'medias.type',
        'medias.released',
        'medias.synopsis',
        'covers.filename',
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
      .from('medias')
      .join('books_infos', 'medias.id', '=', 'books_infos.media_id')
      .join('reviews', 'medias.id', '=', 'reviews.media_id')
      .join('covers', 'medias.id', '=', 'covers.media_id')
      .select(
        'medias.id',
        'medias.media_parent_id',
        'medias.name',
        'medias.type',
        'medias.released',
        'medias.synopsis',
        'covers.filename',
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
      .where('medias.id', '=', mediaId)

    const noBookFound = datas.length === 0
    if (noBookFound) {
      throw new Error("Aucun livre correspondant n'a été trouvé")
    }
    const book = datas.map((data) => {
      const { id, mediaParentId, name, type, released, synopsis } = data
      const {
        filename,
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
