import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import Cover from 'App/Models/Cover'
import Media from 'App/Models/Media'
import UpdateCoverValidator from 'App/Validators/UpdateCoverValidator'
import { createAlternativeText, defaultCoverAltText } from 'App/Tools/Functions/generateCoverAltText'
import { defaultCoverFilename, createFileName } from 'App/Tools/Functions/generateCoverName'
import { standardize } from 'App/Tools/Functions/standardizeCover'

export default class CoversController {
  public async getAllCovers({ response }: HttpContextContract) {
    const covers = await Cover.all()
    return response.status(201).json(covers)
  }

  public async updateOneCover({ request, params, response }: HttpContextContract) {
    const mediaId = params.mediaId
    const mediaRelatedToCover = await Media.find(mediaId)
    const mediaDoesntExist = !mediaRelatedToCover
    if (mediaDoesntExist) {
      return response.status(404).json("Aucun media n'a été trouvé")
    }
    const actualCover = await Cover.findBy('media_id', mediaId)
    const coverDoesntExist = !actualCover
    if (coverDoesntExist) {
      return response.status(404).json("Aucune cover liée à ce media n'a été trouvée")
    }

    const payloadValidation = await request.validate(UpdateCoverValidator)
    const newCover = payloadValidation.cover

    const mediaName = mediaRelatedToCover.name
    const mediaType = mediaRelatedToCover.type
    const newCoverName = createFileName()
    const newCoverAltText = createAlternativeText(mediaType, mediaName)
    const newCoverFormated = standardize(newCover.tmpPath)

    try {
      if (actualCover.filename !== defaultCoverFilename) {
        await Drive.delete(`covers/${actualCover.filename}`)
      }
      await Drive.put(`covers/${newCoverName}`, await newCoverFormated, {
        contentType: `image/jpg`,
      })
      actualCover.merge({ filename: newCoverName, alternative: newCoverAltText }).save()
      return response.status(201)
    } catch (error) {
      return response.status(404)
    }
  }

  public async deleteOneCover({ params, response }: HttpContextContract) {
    const mediaId = params.mediaId
    const media = await Media.find(mediaId)
    if (!media) {
      return response.status(404).json('Aucun media correspondant à cet id')
    }
    const cover = await Cover.findBy('media_id', mediaId)

    if (cover) {
      try {
        const isCoverByDefault = cover.filename === defaultCoverFilename
        if (isCoverByDefault) {
          return response.status(404).json("L'image par défaut ne peut être supprimée")
        }
        await Drive.delete(`covers/${cover.filename}`)
        cover.merge({ filename: defaultCoverFilename, alternative: defaultCoverAltText }).save()
        return response.status(201)
      } catch (error) {
        return response.status(404)
      }
    }
  }
}
