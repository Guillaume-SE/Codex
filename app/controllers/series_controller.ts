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

  public async index({ inertia, response }: HttpContext) {
    try {
      const mediaList = await this.mediaService.getAll()
      const seriesList = await this.seriesService.getList(mediaList)

      return inertia.render('series/SeriesList', { seriesList })
    } catch (error) {
      return response.status(404).json(error)
    }
  }
}
