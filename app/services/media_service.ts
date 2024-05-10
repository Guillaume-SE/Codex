import { MediaTypes } from '#enums/MediaTypes'
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

  async isMediaAlreadyAdded(type: MediaTypes, name: string, released: string) {
    const media = await Media.query()
      .from('media')
      .where('type', type)
      .andWhere('name', name)
      .andWhere('released', released)
    const mediaAlreadyExist = media.length > 0

    if (mediaAlreadyExist) {
      throw new Error('Le media a déjà été ajouté')
    }

    return media
  }
}
