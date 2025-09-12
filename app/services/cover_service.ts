import { CloudinaryUtils } from '#classes/CloudinaryUtils'
import Media from '#models/media'
import type { MediaCategories } from '#types/MediaCategories'
import { inject } from '@adonisjs/core'
import { MultipartFile } from '@adonisjs/core/bodyparser'

interface IUploadedCoverData {
  publicId: string
  version: number
}

@inject()
export default class CoverService {
  async upload(
    file: MultipartFile,
    category: MediaCategories,
    existingPublicId?: string
  ): Promise<{ publicId: string; version: number }> {
    if (file.tmpPath === undefined) {
      throw new Error("Aucun chemin disponible pour l'image")
    }

    const cloudinaryUtils = new CloudinaryUtils()
    const uploadedCover = await cloudinaryUtils.upload(file.tmpPath, category, existingPublicId)

    return { publicId: uploadedCover.publicId, version: uploadedCover.version }
  }

  async store(mediaId: number, uploadedCover: IUploadedCoverData) {
    const media = await Media.findOrFail(mediaId)

    const searchPayload = { mediaId: media.id }
    const data = {
      cloudinaryIdentifier: uploadedCover.publicId,
      latestVersion: uploadedCover.version,
    }
    await media.related('cover').updateOrCreate(searchPayload, data)
  }

  async uploadDefault(file: MultipartFile) {
    if (file.tmpPath === undefined) {
      throw new Error("Aucun chemin disponible pour l'image")
    }
    const cloudinaryUtils = new CloudinaryUtils()
    await cloudinaryUtils.uploadDefaultCover(file.tmpPath)
  }

  async delete(publicId: string) {
    const cloudinaryUtils = new CloudinaryUtils()
    await cloudinaryUtils.destroy(publicId)
  }

  async getUsage() {
    const cloudinaryUtils = new CloudinaryUtils()
    const cloudinaryUsage = await cloudinaryUtils.getUsage()

    return cloudinaryUsage
  }
}
