import CoverService from '#services/cover_service'
import MediaService from '#services/media_service'
import SeasonService from '#services/season_service'
import { createSeasonValidator, updateSeasonValidator } from '#validators/season_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class SeasonsController {
  constructor(
    protected mediaService: MediaService,
    protected seasonService: SeasonService,
    protected coverService: CoverService
  ) {}

  public async addOneSeason({ request, response }: HttpContext) {
    try {
      const payloadValidation = await request.validateUsing(createSeasonValidator)
      const newMedia = await this.seasonService.addOneSeason(payloadValidation)
      return response.status(201).json(newMedia)
    } catch (error) {
      return response.status(400).json({ error })
    }
  }

  public async updateOneSeason({ request, params, response }: HttpContext) {
    const mediaId = params.mediaId
    try {
      const payloadValidation = await request.validateUsing(updateSeasonValidator)
      const season = await this.seasonService.updateOneSeason(payloadValidation, mediaId)

      return response.status(201).json(season)
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ error })
      }
      return response.status(400).json({ error })
    }
  }

  public async getAllSeasons({ response }: HttpContext) {
    const seasons = await this.seasonService.getAllSeasons()
    return response.status(201).json(seasons)
  }

  public async getOneSeasonByMediaId({ params, response }: HttpContext) {
    const mediaId = params.mediaId

    try {
      const season = await this.seasonService.getOneSeasonByMediaId(mediaId)
      return response.status(200).json(season)
    } catch (error) {
      return response.status(404).json({ errorName: error.name, errorMessage: error.message })
    }
  }
}
