import { inject } from "@adonisjs/core/build/standalone"
import Drive from "@ioc:Adonis/Core/Drive"
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import Database from "@ioc:Adonis/Lucid/Database"
import BookInfo from "App/Models/BookInfo"
import Cover from "App/Models/Cover"
import Media from "App/Models/Media"
import BookService from "App/Services/BookService"
import { bookTypes } from "App/Tools/Enums/MediaTypes"
import {
  createAlternativeText,
  defaultCoverAltText,
} from "App/Tools/Functions/generateCoverAltText"
import { createFileName, defaultCoverFilename } from "App/Tools/Functions/generateCoverName"
import { standardize } from "App/Tools/Functions/standardizeCover"
import CreateBookValidator from "App/Validators/CreateBookValidator"
import UpdateBookValidator from "App/Validators/UpdateBookValidator"

@inject()
export default class BooksController {
  constructor(protected bookService: BookService) {}

  public async addOneBook({ request, response }: HttpContextContract) {
    const payloadValidation = await request.validate(CreateBookValidator)
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
    } = payloadValidation

    const searchIfBookAlreadyExist = await Media.query()
      .from("medias")
      .where("type", type)
      .andWhere("name", name)
      .andWhere("released", released)
    const bookAlreadyExist = searchIfBookAlreadyExist.length > 0

    if (bookAlreadyExist) {
      return response.status(400).json({
        message: "Ce livre a déjà été ajouté !",
        media: searchIfBookAlreadyExist,
      })
    }
    const mediaIsBookType = bookTypes.includes(type)
    if (!mediaIsBookType) {
      return response.status(400).json({
        message: "Le type du media ne correspond pas à la catégorie livre",
      })
    }

    // manage covers
    let coverName: string = defaultCoverFilename
    let coverAltText: string = defaultCoverAltText
    if (cover) {
      coverName = createFileName()
      coverAltText = createAlternativeText(type, name)
      const coverFormated = standardize(cover.tmpPath)
      await Drive.put(`covers/${coverName}`, await coverFormated, {
        contentType: `image/jpg`,
      })
    }

    const generalMediaInfos = { mediaParentId, type, name, released, synopsis }
    const coverInfo = { filename: coverName, alternative: coverAltText }
    const reviewInfo = { status, rating, opinion, isFavorite }

    const trx = await Database.transaction()
    try {
      const newMedia = await Media.create(generalMediaInfos)
      await newMedia.related("bookInfo").create(specificBookInfos)
      await newMedia.related("cover").create(coverInfo)
      await newMedia.related("review").create(reviewInfo)

      await trx.commit()
      return response.status(201).json({ media: newMedia, cover: coverInfo, review: reviewInfo })
    } catch (error) {
      await trx.rollback()
      if (coverName !== defaultCoverFilename) {
        await Drive.delete(`covers/${coverName}`)
      }
      return response.status(400).json(error)
    }
  }

  public async updateOneBook({ request, params, response }: HttpContextContract) {
    const mediaId = params.id
    const mediaToUpdate = await Media.find(mediaId)
    const mediaDoesntExist = !mediaToUpdate
    if (mediaDoesntExist) {
      return response.status(404).json("Aucun media ne correspond à cet identifiant")
    }

    const actualCover = await Cover.findBy("media_id", mediaId)
    const coverDoesntExist = !actualCover
    if (coverDoesntExist) {
      return response.status(404).json("Aucune cover liée à ce media n'a été trouvée")
    }

    const bookToUpdate = await BookInfo.findBy("mediaId", mediaId)
    const bookDoesntExist = !bookToUpdate
    if (bookDoesntExist) {
      return response.status(404).json("Aucun livre ne correspond à ce media")
    }

    const payloadValidation = await request.validate(UpdateBookValidator)
    const { mediaParentId, type, name, released, synopsis, ...specificBookInfos } =
      payloadValidation
    const generalMediaInfos = { mediaParentId, type, name, released, synopsis }

    const mediaBookType = bookTypes.includes(type)
    if (!mediaBookType) {
      return response.status(400).json({
        message: "Le type ne correspond pas à la catégorie livre",
      })
    }

    // update cover alt text
    const mediaNameAsChanged = mediaToUpdate.name !== payloadValidation.name
    const newCoverAltText = createAlternativeText(type, name)

    const trx = await Database.transaction()

    try {
      mediaToUpdate.merge(generalMediaInfos).save()
      bookToUpdate.merge(specificBookInfos).save()
      if (mediaNameAsChanged) {
        actualCover.merge({ alternative: newCoverAltText }).save()
      }

      await trx.commit()
      return response
        .status(201)
        .json({ media: mediaToUpdate, bookInfos: bookToUpdate, cover: actualCover })
    } catch (error) {
      await trx.rollback()
      return response.status(400).json(error)
    }
  }

  public async getAllBooks({ response }: HttpContextContract) {
    const books = await this.bookService.getAllBooks()
    return response.status(201).json(books)
  }

  public async getOneBookByMediaId({ params, response }: HttpContextContract) {
    const mediaId = params.mediaId

    try {
      const book = await this.bookService.getBookByMediaId(mediaId)
      return response.status(200).json(book)
    } catch (NotFoundError) {
      return response
        .status(404)
        .json({ error_name: NotFoundError.name, error_message: NotFoundError.message })
    }
  }
}
