import { MediaService } from '#services/media_service'
import PresentedMediaTransformer from '#transformers/presented_media_transformer'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class HomeController {
  constructor(protected mediaService: MediaService) {}

  public async index({ inertia }: HttpContext) {
    const { movies, series } = await this.mediaService.getHomeFeed()

    return inertia.render('home', {
      movies: PresentedMediaTransformer.transform(movies),
      series: PresentedMediaTransformer.transform(series),
    })
  }
}
