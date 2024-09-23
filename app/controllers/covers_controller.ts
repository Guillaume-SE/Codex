import Cover from '#models/cover'
import CoverService from '#services/cover_service'
import { manageCoverValidator } from '#validators/cover_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CoversController {
  constructor(readonly coverService: CoverService) {}

  async manageOneCover({ params, response, request }: HttpContext) {
    const mediaId = params.mediaId
    try {
      const { cover } = await request.validateUsing(manageCoverValidator)
      const uploadedCover = await this.coverService.storeCover(cover)
      await this.coverService.saveStoredCoverFilenames(uploadedCover, mediaId)

      return response.status(201)
    } catch (error) {
      return response.status(404).json({ error, customError: error.message })
    }
  }

  public async deleteOneCover({ params, response }: HttpContext) {
    const mediaId = params.mediaId

    try {
      const cover = await Cover.findBy('media_id', mediaId)
      if (!cover) {
        throw new Error("Aucune cover n'a été trouvée pour ce media")
      }

      await this.coverService.deleteCover({
        original: cover.originalCoverFilename,
        small: cover.smallCoverFilename,
        medium: cover.mediumCoverFilename,
        large: cover.largeCoverFilename,
      })

      await cover.delete()

      return response.status(201)
    } catch (error) {
      return response.status(404).json(error)
    }
  }

  public async getAllCovers({ response }: HttpContext) {
    const coverList = await Cover.all()
    return response.status(201).json(coverList)
  }
}
