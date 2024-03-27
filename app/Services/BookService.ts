import { inject } from "@adonisjs/core/build/standalone"
import NotFoundError from "App/Exceptions/CustomError"
import Media from "App/Models/Media"

@inject()
export default class BookService {
  async getAllBooks() {
    const datas = await Media.query()
      .from("medias")
      .join("books_infos", "medias.id", "=", "books_infos.media_id")
      .join("reviews", "medias.id", "=", "reviews.media_id")
      .join("covers", "medias.id", "=", "covers.media_id")
      .select(
        "medias.id",
        "medias.media_parent_id",
        "medias.name",
        "medias.type",
        "medias.released",
        "medias.synopsis",
        "covers.filename",
        "covers.alternative",
        "books_infos.author",
        "books_infos.illustrator",
        "books_infos.editor",
        "books_infos.pages",
        "reviews.status",
        "reviews.rating",
        "reviews.opinion",
        "reviews.is_favorite",
        "reviews.created_at",
        "reviews.updated_at"
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

  async getBookByMediaId(mediaId: number) {
    const datas = await Media.query()
      .from("medias")
      .join("books_infos", "medias.id", "=", "books_infos.media_id")
      .join("reviews", "medias.id", "=", "reviews.media_id")
      .join("covers", "medias.id", "=", "covers.media_id")
      .select(
        "medias.id",
        "medias.media_parent_id",
        "medias.name",
        "medias.type",
        "medias.released",
        "medias.synopsis",
        "covers.filename",
        "covers.alternative",
        "books_infos.author",
        "books_infos.illustrator",
        "books_infos.editor",
        "books_infos.pages",
        "reviews.status",
        "reviews.rating",
        "reviews.opinion",
        "reviews.is_favorite",
        "reviews.created_at",
        "reviews.updated_at"
      )
      .where("medias.id", "=", mediaId)

    const noBookFound = datas.length === 0
    if (noBookFound) {
      throw new NotFoundError("Aucun livre correspondant n'a été trouvé")
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
}
