import type { IMedia, IMediaPayload } from '#interfaces/media_interface'
import CoverService from '#services/cover_service'
import MediaService from '#services/media_service'
import { createMediaValidator, updateMediaValidator } from '#validators/media_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MediasController {
  constructor(
    readonly mediaService: MediaService,
    readonly coverService: CoverService
  ) {}

  async addOneMedia({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createMediaValidator)
      const {
        mediaParentId,
        statusId,
        categoryId,
        typeId,
        name,
        alternativeName,
        released,
        synopsis,
        genresIds,
        ...mediaSpecificInfos
      }: IMediaPayload = data

      const generalMediaInfos: IMediaPayload = {
        mediaParentId,
        statusId,
        categoryId,
        typeId,
        name,
        alternativeName,
        released,
        synopsis,
      }
      const newMedia = await this.mediaService.addOneMedia(
        generalMediaInfos,
        genresIds,
        mediaSpecificInfos
      )
      return response.status(201).json(newMedia)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  async updateOneMedia({ params, response, request }: HttpContext) {
    const mediaId = params.mediaId
    try {
      const data = await request.validateUsing(updateMediaValidator)
      const {
        mediaParentId,
        statusId,
        typeId,
        name,
        alternativeName,
        released,
        synopsis,
        genresIds,
        ...mediaSpecificInfos
      }: IMediaPayload = data

      const generalMediaInfos: IMediaPayload = {
        mediaParentId,
        statusId,
        typeId,
        name,
        alternativeName,
        released,
        synopsis,
      }
      const media = await this.mediaService.updateOneMedia(
        mediaId,
        generalMediaInfos,
        genresIds,
        mediaSpecificInfos
      )
      return response.status(201).json(media)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  async deleteOneMedia({ params, response }: HttpContext) {
    const mediaId = params.mediaId

    try {
      const cover = await this.coverService.getOneCoverByMediaId(mediaId)
      await this.mediaService.deleteOneMedia(mediaId)
      if (cover) {
        await this.coverService.deleteCoverByFilenames(
          cover.resizedCoverFilename,
          cover.originalCoverFilename
        )
      }

      return response.status(200)
    } catch (error) {
      return response.status(404).json({ error, customError: error.message })
    }
  }

  public async getAllMedia({ response }: HttpContext) {
    try {
      const mediaList = await this.mediaService.getAllMedia()

      return response.status(201).json(mediaList)
    } catch (error) {
      return response.status(404).json({ error, customError: error.message })
    }
  }

  public async getOneMediaById({ params, response }: HttpContext) {
    const mediaId = params.mediaId
    try {
      const media = await this.mediaService.getOneMediaById(mediaId)

      return response.status(201).json(media)
    } catch (error) {
      return response.status(404).json({ error, customError: error.message })
    }
  }
}
