import type { IBaseMediaFormatted } from '#interfaces/media_formatted_interface'
import { inject } from '@adonisjs/core'

@inject()
export default class SeriesService {
  public async getList(mediaList: IBaseMediaFormatted[]) {
    const seriesList = mediaList.filter((media) => media.category === 'Série')

    return seriesList
  }
}
