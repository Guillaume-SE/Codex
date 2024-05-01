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

    try {
      const payloadValidation = await request.validateUsing(updateCoverValidator)
      const cover = await this.coverService.updateOneCover(payloadValidation, mediaId)

      return response.status(201).json(cover)
    } catch (error) {
      return response.status(404).json(error)
    }
  }

  public async deleteOneCover({ params, response }: HttpContext) {
    const mediaId = params.mediaId

    try {
      const cover = await this.coverService.deleteOneCover(mediaId)
      return response.status(201).json(cover)
    } catch (error) {
      return response.status(404).json(error)
    }
  }
}
