import Media from '#models/media'
import { inject } from '@adonisjs/core'

@inject()
export default class MediaService {
  constructor() {}

  public async deleteOneMedia(mediaId: number) {
    const media = await this.getOneMediaById(mediaId)
    if (!media) {
      throw new Error('pas de media')
    }
    await media.delete()
  }

  async getOneMediaById(mediaId: number) {
    const media = await Media.find(mediaId)
    return media
  }
}
