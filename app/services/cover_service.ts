import { CoverUtils } from '#classes/CoverUtils'
import { ICover, INewCover } from '#interfaces/cover_interface'
import Cover from '#models/cover'
import Media from '#models/media'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import { PathLike } from 'node:fs'
import { rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

@inject()
export default class CoverService {
  protected coverResizedDir: string | PathLike = env.get('COVER_RESIZED_DIR')
  protected coverOriginalDir: string | PathLike = env.get('COVER_ORIGINAL_DIR')
  protected coverExtension: string | PathLike = env.get('DEFAULT_COVER_EXTENSION')

  async saveCoverData(data: INewCover, mediaId: number) {
    const media = await Media.find(mediaId)
    if (!media) {
      throw new Error("Le media n'existe pas")
    }

    const existingCover = await Cover.findBy('media_id', mediaId)

    const coverName = CoverUtils.generateUniqueString()
    const resizedCoverFilename = CoverUtils.createFileName(coverName, this.coverExtension, false)
    const originalCoverFilename = CoverUtils.createFileName(coverName, this.coverExtension, true)
    const coverTmpPath = data.cover.tmpPath

    const coverInfos: ICover = {
      resizedCoverFilename: resizedCoverFilename,
      originalCoverFilename: originalCoverFilename,
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

  async saveCoverFile(
    resizedFilename: string,
    originalFilename: string,
    tmpPath: string | undefined
  ) {
    if (tmpPath === undefined) {
      throw new Error("Aucun chemin disponible pour l'image")
    }
    const coverResized = await CoverUtils.resize(tmpPath, 340)
    const coverResizedFullPath = `${this.coverResizedDir}${resizedFilename}`
    await writeFile(coverResizedFullPath, coverResized)

    //to keep a clean original version
    const coverOriginal = await CoverUtils.toBuffer(tmpPath)
    const coverOriginalFullPath = `${this.coverOriginalDir}${originalFilename}`
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
    const coverResizedFullpath = path.join(`${this.coverResizedDir}${resizedCoverfilename}`)
    const coverOriginalFullpath = path.join(`${this.coverOriginalDir}${originalCoverFilename}`)
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
