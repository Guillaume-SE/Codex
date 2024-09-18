import { CoverUtils } from '#classes/CoverUtils'
import type { ICover } from '#interfaces/cover_interface'
import Cover from '#models/cover'
import Media from '#models/media'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import { PathLike } from 'node:fs'
import { rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

@inject()
export default class CoverService {
  protected RESIZED_COVER_DIR: string | PathLike = env.get('RESIZED_COVER_DIR')
  protected ORIGINAL_COVER_DIR: string | PathLike = env.get('ORIGINAL_COVER_DIR')

  async saveStoredCoverFilenames(file: MultipartFile, mediaId: number) {
    const media = await Media.find(mediaId)
    if (!media) {
      throw new Error("Le media n'existe pas")
    }

    const existingCover = await Cover.findBy('media_id', mediaId)

    const coverFilenames = CoverUtils.createFilenames()
    const coverTmpPath = file.tmpPath

    const coverInfos: ICover = {
      resizedCoverFilename: coverFilenames.resized,
      originalCoverFilename: coverFilenames.original,
    }

    const searchPayload = { mediaId: media.id }
    await media.related('cover').updateOrCreate(searchPayload, coverInfos)

    if (existingCover) {
      await this.deleteCoverByFilenames(
        existingCover.resizedCoverFilename,
        existingCover.originalCoverFilename
      )
    }

    return { coverInfos, coverTmpPath }
  }

  async storeCover(resizedFilename: string, originalFilename: string, tmpPath: string | undefined) {
    if (tmpPath === undefined) {
      throw new Error("Aucun chemin disponible pour l'image")
    }
    const coverResized = await CoverUtils.resize(tmpPath, 340)
    const coverResizedFullPath = `${this.RESIZED_COVER_DIR}${resizedFilename}`
    await writeFile(coverResizedFullPath, coverResized)

    //to keep a clean original version
    const coverOriginal = await CoverUtils.toBuffer(tmpPath)
    const coverOriginalFullPath = `${this.ORIGINAL_COVER_DIR}${originalFilename}`
    await writeFile(coverOriginalFullPath, coverOriginal)

    return { coverResizedFullPath, coverOriginalFullPath }
  }

  async deleteOneCoverByMediaId(mediaId: number) {
    const cover = await Cover.findBy('media_id', mediaId)
    if (!cover) {
      throw new Error("Aucune cover n'a été trouvée pour ce media")
    }

    await this.deleteCoverByFilenames(cover.resizedCoverFilename, cover.originalCoverFilename)

    await cover.delete()
  }

  async deleteCoverByFilenames(resizedCoverfilename: string, originalCoverFilename: string) {
    const coverResizedFullpath = path.join(`${this.RESIZED_COVER_DIR}${resizedCoverfilename}`)
    const coverOriginalFullpath = path.join(`${this.ORIGINAL_COVER_DIR}${originalCoverFilename}`)
    await rm(coverResizedFullpath, { force: true })
    await rm(coverOriginalFullpath, { force: true })
  }

  async getAllCovers() {
    const coverList = await Cover.all()
    return coverList
  }

  async getOneCoverByMediaId(mediaId: number) {
    const validMedia = await Media.find(mediaId)
    if (!validMedia) {
      throw new Error('Aucun media trouvé')
    }
    const cover = await Cover.findBy('media_id', validMedia.id)

    return cover
  }
}
