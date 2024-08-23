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
      const datas = await request.validateUsing(manageCoverValidator)
      const newCover = await this.coverService.saveCoverDatas(datas, mediaId)
      const coverInfos = {
        tmpPath: newCover.coverTmpPath,
        resizedFilename: newCover.coverInfos.resizedCoverFilename,
        rawFilename: newCover.coverInfos.originalCoverFilename,
      }
      await this.coverService.saveCoverFile(
        coverInfos.resizedFilename,
        coverInfos.rawFilename,
        coverInfos.tmpPath
      )
      return response.status(201).json(newCover)
    } catch (error) {
      return response.status(404).json({ error, customError: error.message })
    }
  }

  public async deleteOneCover({ params, response }: HttpContext) {
    const mediaId = params.mediaId

    try {
      const cover = await this.coverService.deleteOneCoverByMediaId(mediaId)
      return response.status(201).json(cover)
    } catch (error) {
      return response.status(404).json(error)
    }
  }

  public async getAllCovers({ response }: HttpContext) {
    const covers = await this.coverService.getAllCovers()
    return response.status(201).json(covers)
  }
}
