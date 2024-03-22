import Drive from '@ioc:Adonis/Core/Drive'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Media from 'App/Models/Media'
import { bookTypes } from 'App/Tools/Enums/MediaTypes'
import {
  createAlternativeText,
  defaultCoverAltText,
} from 'App/Tools/Functions/generateCoverAltText'
import { createFileName, defaultCoverFilename } from 'App/Tools/Functions/generateCoverName'
import { standardize } from 'App/Tools/Functions/standardizeCover'
import CreateBookValidator from 'App/Validators/CreateBookValidator'

export default class BooksController {
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
      .from('medias')
      .where('type', type)
      .andWhere('name', name)
      .andWhere('released', released)
    const bookAlreadyExist = searchIfBookAlreadyExist.length > 0

    if (bookAlreadyExist) {
      return response.status(400).json({
        message: 'Ce livre a déjà été ajouté !',
        media: searchIfBookAlreadyExist,
      })
    }
    const mediaIsBookType = bookTypes.includes(type)
    if (!mediaIsBookType) {
      return response.status(400).json({
        message: 'Le type du media ne correspond pas à la catégorie livre',
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
      await newMedia.related('bookInfo').create(specificBookInfos)
      await newMedia.related('cover').create(coverInfo)
      await newMedia.related('review').create(reviewInfo)

      await trx.commit()
      return response.status(201).json({ newMedia, coverInfo, reviewInfo })
    } catch (error) {
      await trx.rollback()
      if (coverName !== defaultCoverFilename) {
        await Drive.delete(`covers/${coverName}`)
      }
      return response.status(400).json(error)
    }
  }
}
