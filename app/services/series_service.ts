import { ICompleteMedia } from '#interfaces/media_interface'
import { inject } from '@adonisjs/core'

@inject()
export default class SeriesService {
  public async getAllSeries(mediaList: Array<ICompleteMedia>) {
    const seriesList = mediaList.filter((media) => media.category === 'Série')

    return seriesList
  }
}
