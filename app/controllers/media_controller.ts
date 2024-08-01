import { IMedia, INewMediaPayload, IUpdatedMediaPayload } from '#interfaces/media_interface'
import Media from '#models/media'
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
      const datas = await request.validateUsing(createMediaValidator)
      const {
        mediaParentId,
        categoryId,
        typeId,
        name,
        alternativeName,
        released,
        synopsis,
        genresIds,
        ...mediaSpecificInfos
      }: INewMediaPayload = datas

      const generalMediaInfos: IMedia = {
        mediaParentId,
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
      const datas = await request.validateUsing(updateMediaValidator)
      const {
        mediaParentId,
        typeId,
        name,
        alternativeName,
        released,
        synopsis,
        genresIds,
        ...mediaSpecificInfos
      }: IUpdatedMediaPayload = datas

      const generalMediaInfos: IMedia = {
        mediaParentId,
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
    const mediaId = params.id

    try {
      await this.coverService.deleteOneCover(mediaId)
      await this.mediaService.deleteOneMedia(mediaId)
      return response.status(200)
    } catch (error) {
      return response.status(404).json(error)
    }
  }

  public async getAllMedia({ response }: HttpContext) {
    const medias = await Media.all()
    return response.status(201).json(medias)
  }

  public async getOneMediaById({ params, response }: HttpContext) {
    const mediaId = params.id
    try {
      const media = await Media.find(mediaId)
      return response.status(201).json(media)
    } catch (error) {
      return response.status(404).json(error)
    }
  }
}
