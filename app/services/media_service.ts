import { MediaTypes } from '#enums/MediaTypes'
import Media from '#models/media'

export default class MediaService {
  async isMediaAlreadyAdded(type: MediaTypes, name: string, released: string) {
    const media = await Media.query()
      .from('medias')
      .where('type', type)
      .andWhere('name', name)
      .andWhere('released', released)
    const mediaAlreadyExist = media.length > 0

    if (mediaAlreadyExist) {
      throw new Error('Le media a déjà été ajouté')
    }

    return media
  }

  async isMediaExist(mediaId: number) {
    const media = await Media.find(mediaId)
    return media
  }
}
