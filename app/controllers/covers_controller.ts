import { resize } from '#functions/cover_modification'
import { createAlternativeText } from '#functions/create_cover_alt_text'
import { createFileName } from '#functions/generate_cover_name'
import Cover from '#models/cover'
import Media from '#models/media'
import CoverService from '#services/cover_service'
import env from '#start/env'
import { updateCoverValidator } from '#validators/cover_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CoversController {
  constructor(protected coverService: CoverService) {}
  protected defaultCoverFilename = env.get('DEFAULT_COVER_FILENAME')
  protected defaultCoverAltText = env.get('DEFAULT_COVER_ALT_TEXT')

  public async getAllCovers({ response }: HttpContext) {
    const covers = await this.coverService.getAllCovers()
    return response.status(201).json({ covers: covers })
  }

  public async updateOneCover({ request, params, response }: HttpContext) {
    const mediaId = params.mediaId

    const payloadValidation = await request.validateUsing(updateCoverValidator)
    const newCover = payloadValidation.cover

    const mediaName = mediaRelatedToCover.name
    const mediaType = mediaRelatedToCover.type
    const newCoverName = createFileName()
    const newCoverAltText = createAlternativeText(mediaType, mediaName)
    const newCoverFormated = resize(newCover.tmpPath)

    try {
      if (actualCover.filename !== this.defaultCoverFilename) {
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

  public async deleteOneCover({ params, response }: HttpContext) {
    const mediaId = params.mediaId
    const media = await Media.find(mediaId)
    if (!media) {
      return response.status(404).json('Aucun media correspondant à cet id')
    }
    const cover = await Cover.findBy('media_id', mediaId)

    if (cover) {
      try {
        const isCoverByDefault = cover.filename === this.defaultCoverFilename
        if (isCoverByDefault) {
          return response.status(404).json("L'image par défaut ne peut être supprimée")
        }
        await Drive.delete(`covers/${cover.filename}`)
        cover
          .merge({ filename: this.defaultCoverFilename, alternative: this.defaultCoverAltText })
          .save()
        return response.status(201)
      } catch (error) {
        return response.status(404)
      }
    }
  }
}
