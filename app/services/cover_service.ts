import { CoverUtils } from '#classes/CoverUtils'
import type { ICover, ICoverFilenames } from '#interfaces/cover_interface'
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
  protected ORIGINAL_COVER_DIR: string | PathLike = env.get('ORIGINAL_COVER_DIR')
  protected MEDIUM_COVER_DIR: string | PathLike = env.get('MEDIUM_COVER_DIR')

  async storeCover(file: MultipartFile) {
    if (file.tmpPath === undefined) {
      throw new Error("Aucun chemin disponible pour l'image")
    }

    const coverUtils = new CoverUtils()
    const coverOriginal = await coverUtils.processImage(file.tmpPath, {
      format: 'jpg',
    })
    const coverSmall = await coverUtils.processImage(file.tmpPath, {
      width: 150,
      height: 225,
      format: 'jpg',
    })
    const coverMedium = await coverUtils.processImage(file.tmpPath, {
      width: 300,
      height: 450,
      format: 'jpg',
    })
    const coverLarge = await coverUtils.processImage(file.tmpPath, {
      width: 600,
      height: 900,
      format: 'jpg',
    })

    const coverFilenames = coverUtils.createFilenames()
    const coverFullPaths = coverUtils.getFullPaths({
      original: coverFilenames.original,
      small: coverFilenames.small,
      medium: coverFilenames.medium,
      large: coverFilenames.large,
    })

    await writeFile(coverFullPaths.original, coverOriginal)
    await writeFile(coverFullPaths.small, coverSmall)
    await writeFile(coverFullPaths.medium, coverMedium)
    await writeFile(coverFullPaths.large, coverLarge)

    return coverFilenames
  }

  async saveStoredCoverFilenames(filenames: ICoverFilenames, mediaId: number) {
    const media = await Media.find(mediaId)
    if (!media) {
      throw new Error("Le media n'existe pas")
    }

    const existingCover = await Cover.findBy('media_id', mediaId)

    const coverFilenames = {
      originalCoverFilename: filenames.original,
      smallCoverFilename: filenames.small,
      mediumCoverFilename: filenames.medium,
      largeCoverFilename: filenames.large,
    }

    const searchPayload = { mediaId: media.id }
    await media.related('cover').updateOrCreate(searchPayload, coverFilenames)

    if (existingCover) {
      await this.deleteCover({
        original: existingCover.originalCoverFilename,
        small: existingCover.smallCoverFilename,
        medium: existingCover.mediumCoverFilename,
        large: existingCover.largeCoverFilename,
      })
    }
  }

  async deleteCover(filenames: ICoverFilenames) {
    const coverUtils = new CoverUtils()
    const coverFullPaths = coverUtils.getFullPaths({
      original: filenames.original,
      small: filenames.small,
      medium: filenames.medium,
      large: filenames.large,
    })
    await rm(coverFullPaths.original, { force: true })
    await rm(coverFullPaths.small, { force: true })
    await rm(coverFullPaths.medium, { force: true })
    await rm(coverFullPaths.large, { force: true })
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
