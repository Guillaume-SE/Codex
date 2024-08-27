import type { IMedia } from '#interfaces/media_interface'
import { inject } from '@adonisjs/core'

@inject()
export default class SeriesService {
  public async getAllSeries(mediaList: IMedia[]) {
    const seriesList = mediaList.filter((media) => media.category === 'Série')

    return seriesList
  }
}
