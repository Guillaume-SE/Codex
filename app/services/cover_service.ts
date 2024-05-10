// import Drive from "@ioc:Adonis/Core/Drive"
import { MediaTypes } from '#enums/MediaTypes'
import { resize, toBuffer } from '#functions/cover_modification'
import { createAlternativeText } from '#functions/create_cover_alt_text'
import { createFileName } from '#functions/generate_cover_name'
import { generateUniqueString } from '#functions/generate_unique_string'
import { INewCover } from '#interfaces/cover_interface'
import Cover from '#models/cover'
import Media from '#models/media'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import { PathLike } from 'node:fs'
import { rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

@inject()
export default class CoverService {
  constructor() {}

  protected coverResizedDir: string | PathLike = env.get('COVER_RESIZED_DIR')
  protected coverRawDir: string | PathLike = env.get('COVER_RAW_DIR')
  protected coverExtension: string | PathLike = env.get('DEFAULT_COVER_EXTENSION')
  protected defaultCoverFilename = env.get('DEFAULT_COVER_FILENAME')
  protected defaultCoverAltText = env.get('DEFAULT_COVER_ALT_TEXT')

  async saveCover(type: MediaTypes, name: string, tmpPath: string | undefined) {
    const coverName = generateUniqueString()
    const coverFilename = createFileName(coverName, this.coverExtension, false)
    const coverAltText = createAlternativeText(type, name)

    const coverResized = await resize(tmpPath)
    const coverResizedFullPath = `${this.coverResizedDir}${coverFilename}`
    const saveCoverResized = await writeFile(coverResizedFullPath, coverResized)

    // same without modification
    const coverRawFilename = createFileName(coverName, this.coverExtension, true)
    const coverRaw = await toBuffer(tmpPath)
    const coverRawFullPath = `${this.coverRawDir}${coverRawFilename}`
    const saveCoverRaw = await writeFile(coverRawFullPath, coverRaw)

    return { coverFilename, coverRawFilename, coverAltText }
  }

  async updateOneCover(datas: INewCover, mediaId: number) {
    const media = await Media.find(mediaId)
    if (!media) {
      throw new Error('pas de media')
    }

    const actualCover = await this.getOneCoverById(mediaId)
    if (!actualCover) {
      throw new Error('pas de cover')
    }
    const newCover = datas.cover

    //delete old file
    const isNotDefaultCover = actualCover.filename !== this.defaultCoverFilename
    if (isNotDefaultCover) {
      await rm(`${this.coverResizedDir}${actualCover.filename}`)
      await rm(`${this.coverRawDir}${actualCover.filenameRaw}`)
    }

    const saveNewCover = await this.saveCover(media.type, media.name, newCover.tmpPath)
    const newCoverName = saveNewCover.coverFilename
    const newCoverRawName = saveNewCover.coverRawFilename
    const newCoverAltText = saveNewCover.coverAltText
    actualCover
      .merge({ filename: newCoverName, filenameRaw: newCoverRawName, alternative: newCoverAltText })
      .save()

    return { filename: newCoverName, filenameRaw: newCoverRawName, alternative: newCoverAltText }
  }

  async deleteOneCover(mediaId: number) {
    const cover = await Cover.findBy('media_id', mediaId)

    if (cover) {
      const isNotDefaultCover = cover.filename !== this.defaultCoverFilename
      if (isNotDefaultCover) {
        const coverResizedFullpath = path.join(`${this.coverResizedDir}${cover.filename}`)
        const coverRawFullpath = path.join(`${this.coverRawDir}${cover.filenameRaw}`)
        await rm(coverResizedFullpath, { force: true })
        await rm(coverRawFullpath, { force: true })

        cover
          .merge({
            filename: this.defaultCoverFilename,
            filenameRaw: null,
            alternative: this.defaultCoverAltText,
          })
          .save()
      }
    }
  }

  async deleteCoverWithFilename(filename: string | null) {
    const isNotDefaultCover = filename !== this.defaultCoverFilename
    if (isNotDefaultCover) {
      await rm(`${path}${filename}`)
    }
  }

  async getAllCovers() {
    const covers = await Cover.all()
    return covers
  }

  async getOneCoverById(mediaId: number) {
    const cover = await Cover.findBy('media_id', mediaId)
    return cover
  }
}
