import { AlreadyExistError, WrongMediaTypeError } from '#app/exceptions/CustomError'
import CreateSeasonValidator from '#app/validators/CreateSeasonValidator'
import UpdateSeasonValidator from '#app/validators/UpdateSeasonValidator'
import CoverService from '#services/cover_service'
import MediaService from '#services/media_service'
import SeasonService from '#services/season_service'
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
    const payloadValidation = await request.validate(CreateSeasonValidator)
    try {
      const newMedia = await this.seasonService.addOneSeason(payloadValidation)
      return response.status(201).json(newMedia)
    } catch (error) {
      if (error instanceof AlreadyExistError || error instanceof WrongMediaTypeError) {
        return response.status(400).json({
          name: error.name,
          message: error.message,
        })
      }
      console.error(error)
    }
  }

  public async updateOneSeason({ request, params, response }: HttpContext) {
    const mediaId = params.id
    const payloadValidation = await request.validate(UpdateSeasonValidator)
    try {
      const season = await this.seasonService.updateOneSeason(payloadValidation, mediaId)

      return response.status(201).json(season)
    } catch (error) {
      if (error instanceof AlreadyExistError || error instanceof WrongMediaTypeError) {
        return response.status(400).json({
          name: error.name,
          message: error.message,
        })
      }
      console.error(error)
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
    } catch (NotFoundError) {
      return response
        .status(404)
        .json({ error_name: NotFoundError.name, error_message: NotFoundError.message })
    }
  }
}
