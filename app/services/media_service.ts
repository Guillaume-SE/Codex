import { INewMedia } from '#interfaces/media_interface'
import Media from '#models/media'
import CoverService from '#services/cover_service'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import { PathLike } from 'node:fs'

@inject()
export default class MediaService {
  constructor(readonly coverService: CoverService) {}
  readonly defaultCoverFilename = env.get('DEFAULT_COVER_FILENAME')
  readonly defaultCoverAltText = env.get('DEFAULT_COVER_ALT_TEXT')
  readonly coverResizedDir: string | PathLike = env.get('COVER_RESIZED_DIR')
  readonly coverRawDir: string | PathLike = env.get('COVER_RAW_DIR')

  public async addOneMedia(datas: INewMedia) {
    const {
      mediaParentId,
      categoryId,
      typeId,
      cover,
      name,
      released,
      synopsis,
      status,
      rating,
      opinion,
      isFavorite,
      ...specificCategoryInfos
    } = datas

    let coverFilename = this.defaultCoverFilename
    let coverRawFilename = null
    let coverAltText = this.defaultCoverAltText
    if (cover) {
      const newCover = await this.coverService.saveCover(name, cover.tmpPath)
      coverFilename = newCover.coverFilename
      coverRawFilename = newCover.coverRawFilename
      coverAltText = newCover.coverAltText
    }

    const generalMediaInfos = { mediaParentId, categoryId, typeId, name, released, synopsis }
    const coverInfo = {
      filename: coverFilename,
      filenameRaw: coverRawFilename,
      alternative: coverAltText,
    }
    const reviewInfo = { status, rating, opinion, isFavorite }

    const newMedia = await Media.create(generalMediaInfos)
    await newMedia.related('bookInfo').create(specificBookInfos)
    await newMedia.related('cover').create(coverInfo)
    await newMedia.related('review').create(reviewInfo)

    return {
      media: generalMediaInfos,
      book: specificBookInfos,
      cover: coverInfo,
      review: reviewInfo,
    }
  }

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
