import CoverService from '#services/cover_service'
import { createCoverValidator } from '#validators/cover_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CoversController {
  constructor(readonly coverService: CoverService) {}

  async addOneCover({ params, response, request }: HttpContext) {
    const mediaId = params.mediaId

    try {
      const datas = await request.validateUsing(createCoverValidator)
      const newCover = await this.coverService.addCoverInfos(datas, mediaId)
      const coverInfos = {
        tmpPath: newCover.coverTmpPath,
        resizedFilename: newCover.coverInfos.resizedVersion,
        rawFilename: newCover.coverInfos.rawVersion,
      }
      await this.coverService.saveCover(
        coverInfos.resizedFilename,
        coverInfos.rawFilename,
        coverInfos.tmpPath
      )
      return response.status(201).json(newCover)
    } catch (error) {
      return response.status(404).json({ error, customError: error.message })
    }
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

  public async getAllCovers({ response }: HttpContext) {
    const covers = await this.coverService.getAllCovers()
    return response.status(201).json({ covers })
  }
}
