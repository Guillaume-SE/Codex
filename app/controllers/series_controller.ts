import MediaService from '#services/media_service'
import SeriesService from '#services/series_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class SeriesController {
  constructor(
    readonly mediaService: MediaService,
    readonly seriesService: SeriesService
  ) {}

  public async getAllSeries({ response }: HttpContext) {
    try {
      const mediaList = await this.mediaService.getAllMedia()
      const seriesList = await this.seriesService.getAllSeries(mediaList)
      return response.status(200).json(seriesList)
    } catch (error) {
      return response.status(404).json(error)
    }
  }
}
