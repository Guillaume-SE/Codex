import { MediaTypes } from '#enums/MediaTypes'
import Cover from '#models/cover'
import Media from '#models/media'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import { unlink } from 'fs/promises'
import { PathLike } from 'node:fs'

@inject()
export default class MediaService {
  constructor() {}

  protected defaultCoverFilename = env.get('DEFAULT_COVER_FILENAME')
  protected coverResizedDir: string | PathLike = env.get('COVER_RESIZED_DIR')
  protected coverRawDir: string | PathLike = env.get('COVER_RAW_DIR')

  public async deleteOneMedia(mediaId: number) {
    const media = await this.isMediaExist(mediaId)
    if (!media) {
      throw new Error('pas de media')
    }

    // direct call to model to avoid circular dependencies
    const coverToDelete = await Cover.findBy('media_id', mediaId)

    await media.delete()

    if (coverToDelete) {
      const isNotDefaultCover = coverToDelete.filename !== this.defaultCoverFilename
      if (isNotDefaultCover) {
        await unlink(`${this.coverResizedDir}${coverToDelete.filename}`)
        await unlink(`${this.coverRawDir}${coverToDelete.filenameRaw}`)
      }
    }
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

  async isMediaExist(mediaId: number) {
    const media = await Media.find(mediaId)
    return media
  }
}
