// import Drive from "@ioc:Adonis/Core/Drive"
import { MediaTypes } from '#enums/MediaTypes'
import { resize, toBuffer } from '#functions/cover_modification'
import { createAlternativeText } from '#functions/create_cover_alt_text'
import { createFullPath } from '#functions/create_file_full_path'
import { createFileName } from '#functions/generate_cover_name'
import { ICover } from '#interfaces/cover_interface'
import Cover from '#models/cover'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import { writeFile } from 'node:fs/promises'
import MediaService from './media_service.js'

@inject()
export default class CoverService {
  constructor(protected mediaService: MediaService) {}
  protected coverResizedDir: string | undefined = env.get('COVER_RESIZED_DIR')
  protected coverRawDir: string | undefined = env.get('COVER_RAW_DIR')
  protected coverExtension: string | undefined = env.get('DEFAULT_COVER_EXTENSION')

  async saveCover(type: MediaTypes, name: string, tmpPath: string | undefined) {
    const coverName = createFileName()
    const coverAltText = createAlternativeText(type, name)
    const coverResized = await resize(tmpPath)
    const coverResizedFullPath = createFullPath(
      coverName,
      this.coverResizedDir,
      this.coverExtension,
      false
    )
    const saveCoverResized = writeFile(coverResizedFullPath, coverResized)

    // save cover without modification
    const coverRaw = await toBuffer(tmpPath)
    const coverRawFullPath = createFullPath(coverName, this.coverRawDir, this.coverExtension, true)
    const saveCoverRaw = writeFile(coverRawFullPath, coverRaw)

    return { coverName, coverAltText }
  }

  async updateOneCover(datas: ICover, mediaId: number) {
    const media = await this.mediaService.isMediaExist(mediaId)
    if (!media) {
      throw new Error('pas de media')
    }

    const cover = await this.isCoverExist(mediaId)
    if (!cover) {
      throw new Error('pas de cover')
    }
  }

  async getAllCovers() {
    const covers = await Cover.all()
    return covers
  }

  async isCoverExist(mediaId: number) {
    const cover = await Cover.findBy('media_id', mediaId)
    return cover
  }
}
