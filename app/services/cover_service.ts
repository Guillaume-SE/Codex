import { CoverUtils } from '#classes/CoverUtils'
import type { ICoverFilenames } from '#interfaces/cover_interface'
import Cover from '#models/cover'
import Media from '#models/media'
import { inject } from '@adonisjs/core'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import drive from '@adonisjs/drive/services/main'

@inject()
export default class CoverService {
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

    const disk = drive.use()
    const files = [coverOriginal, coverSmall, coverMedium, coverLarge]
    const paths = [
      coverFullPaths.original,
      coverFullPaths.small,
      coverFullPaths.medium,
      coverFullPaths.large,
    ]

    // Buffer -> Uint8Array needed for disk method strict type
    const promises = files.map((file, index) => {
      const uint8Array = new Uint8Array(file)
      return disk.put(paths[index], uint8Array)
    })

    await Promise.all(promises)

    return coverFilenames
  }

  async saveStoredCoverFilenames(filenames: ICoverFilenames, mediaId: number) {
    const media = await Media.findOrFail(mediaId)

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
      await this.deleteCoverFile({
        original: existingCover.originalCoverFilename,
        small: existingCover.smallCoverFilename,
        medium: existingCover.mediumCoverFilename,
        large: existingCover.largeCoverFilename,
      })
    }
  }

  async deleteCoverFile(filenames: ICoverFilenames) {
    const coverUtils = new CoverUtils()
    const coverFullPaths = coverUtils.getFullPaths({
      original: filenames.original,
      small: filenames.small,
      medium: filenames.medium,
      large: filenames.large,
    })

    const disk = drive.use()
    await disk.delete(coverFullPaths.original)
    await disk.delete(coverFullPaths.small)
    await disk.delete(coverFullPaths.medium)
    await disk.delete(coverFullPaths.large)
  }
}
