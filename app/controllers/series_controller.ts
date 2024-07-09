import SeriesInfo from '#models/series_info'
import type { HttpContext } from '@adonisjs/core/http'

export default class SeriesController {
  public async getAllSeries({ response }: HttpContext) {}

  public async getOneSeriesById({ params, response }: HttpContext) {
    const mediaId = params.id
    try {
      const media = await SeriesInfo.findBy('mediaId', mediaId)
      return response.status(201).json(media)
    } catch (error) {
      return response.status(404).json(error)
    }
  }
}
