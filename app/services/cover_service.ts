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
import db from '@adonisjs/lucid/services/db'
import { PathLike } from 'node:fs'
import { rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

@inject()
export default class CoverService {
  protected coverResizedDir: string | PathLike = env.get('COVER_RESIZED_DIR')
  protected coverRawDir: string | PathLike = env.get('COVER_RAW_DIR')
  protected coverExtension: string | PathLike = env.get('DEFAULT_COVER_EXTENSION')
  protected defaultCoverFilename = env.get('DEFAULT_COVER_FILENAME')
  protected defaultCoverAltText = env.get('DEFAULT_COVER_ALT_TEXT')

  async addCoverInfos(datas: INewCover, mediaId: number) {
    const media = await Media.find(mediaId)
    if (!media) {
      throw new Error("Le media n'existe pas")
    }

    const existingCover = await Cover.findBy('media_id', mediaId)
    if (existingCover) {
      throw new Error("La media a déjà des infos pour sa cover, redirection vers l'update")
    }

    let coverResizedFilename = this.defaultCoverFilename
    let coverRawFilename = this.defaultCoverFilename
    let coverAltText = this.defaultCoverAltText
    let coverTmpPath = null
    if (datas.cover) {
      const coverName = generateUniqueString()
      coverResizedFilename = createFileName(coverName, this.coverExtension, false)
      coverRawFilename = createFileName(coverName, this.coverExtension, true)
      coverAltText = createAlternativeText(media.name)
      coverTmpPath = datas.cover.tmpPath
    }

    const cover = new Cover()
    await db.transaction(async (trx) => {
      cover.useTransaction(trx)
      await cover
        .merge({
          mediaId: media.id,
          resizedVersion: coverResizedFilename,
          rawVersion: coverRawFilename,
          alternativeText: coverAltText,
        })
        .save()
    })
    return { cover, coverPath: coverTmpPath }
  }

  async saveCover(resizedFilename: string, rawFilename: string, tmpPath: string) {
    const coverResized = await resize(tmpPath, 340)
    const coverResizedFullPath = `${this.coverResizedDir}${resizedFilename}`
    await writeFile(coverResizedFullPath, coverResized)

    //to keep a clean original version
    const coverRaw = await toBuffer(tmpPath)
    const coverRawFullPath = `${this.coverRawDir}${rawFilename}`
    await writeFile(coverRawFullPath, coverRaw)

    return { coverResizedFullPath, coverRawFullPath }
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
    const actualResizedCoverFilename = actualCover.resizedVersion
    const actualRawCoverFilename = actualCover.rawVersion

    //delete old file
    const isNotDefaultCover = actualResizedCoverFilename !== this.defaultCoverFilename
    if (isNotDefaultCover) {
      await rm(`${this.coverResizedDir}${actualResizedCoverFilename}`)
      await rm(`${this.coverRawDir}${actualRawCoverFilename}`)
    }

    const saveNewCover = await this.saveCover(media.name, newCover.tmpPath)
    const newResizedCoverFilename = saveNewCover.coverResizedFilename
    const newRawCoverFilename = saveNewCover.coverRawFilename
    const newCoverAltText = saveNewCover.coverAltText

    actualCover
      .merge({
        resizedVersion: newResizedCoverFilename,
        rawVersion: newRawCoverFilename,
        alternativeText: newCoverAltText,
      })
      .save()

    return {
      resizedVersion: newResizedCoverFilename,
      filenameRaw: newRawCoverFilename,
      alternative: newCoverAltText,
    }
  }

  async deleteOneCover(mediaId: number) {
    const cover = await Cover.findBy('media_id', mediaId)

    if (cover) {
      const actualResizedCoverFilename = cover.resizedVersion
      const actualRawCoverFilename = cover.rawVersion
      const isNotDefaultCover = actualResizedCoverFilename !== this.defaultCoverFilename
      if (isNotDefaultCover) {
        const coverResizedFullpath = path.join(
          `${this.coverResizedDir}${actualResizedCoverFilename}`
        )
        const coverRawFullpath = path.join(`${this.coverRawDir}${actualRawCoverFilename}`)
        await rm(coverResizedFullpath, { force: true })
        await rm(coverRawFullpath, { force: true })

        cover
          .merge({
            resizedVersion: this.defaultCoverFilename,
            rawVersion: null,
            alternativeText: this.defaultCoverAltText,
          })
          .save()
      }
    }
  }

  // async deleteCoverWithFilename(filename: string | null) {
  //   const isNotDefaultCover = filename !== this.defaultCoverFilename
  //   if (isNotDefaultCover) {
  //     await rm(`${path}${filename}`)
  //   }
  // }

  async getAllCovers() {
    const covers = await Cover.all()
    return covers
  }

  async getOneCoverById(mediaId: number) {
    const cover = await Cover.findBy('media_id', mediaId)
    return cover
  }
}
