import env from '#start/env'
import type { MediaCategories } from '#types/MediaCategories'
import { cuid } from '@adonisjs/core/helpers'
import { v2 as cloudinary } from 'cloudinary'

interface ICloudinaryResults {
  publicId: string
  version: number
}

export class CoverUtils {
  private CLOUDINARY_CLOUD_NAME: string = env.get('CLOUDINARY_CLOUD_NAME')
  private CLOUDINARY_API_KEY: string = env.get('CLOUDINARY_API_KEY')
  private CLOUDINARY_API_SECRET: string = env.get('CLOUDINARY_API_SECRET')

  constructor() {
    cloudinary.config({
      cloud_name: this.CLOUDINARY_CLOUD_NAME,
      api_key: this.CLOUDINARY_API_KEY,
      api_secret: this.CLOUDINARY_API_SECRET,
      secure: true,
    })
  }

  private commonUploadOptions = {
    overwrite: true, // overwrite an existing image with the same public_id
    invalidate: true, // allow cache stored file to force update
    resource_type: 'auto', // auto detect the type of the file uploaded (image, video or raw)
    asset_folder: 'codex', // place to store (without him to be prefixed to the public id)
  } as const

  async upload(
    filePath: string,
    tag: MediaCategories,
    existingPublicId?: string
  ): Promise<ICloudinaryResults> {
    const key = existingPublicId || cuid()

    const result = await cloudinary.uploader.upload(filePath, {
      public_id: key, // unique identifier
      quality: 'auto:good', // compromise between file size and quality
      eager: [
        { width: 220, height: 330, crop: 'fill', gravity: 'center' },
        { width: 440, height: 660, crop: 'fill', gravity: 'center' },
      ],
      ...this.commonUploadOptions,
      tags: [tag], // max 1000 tags and max 255 chars.
      format: 'webp',
    })

    console.log('classic', result)

    return { publicId: key, version: result.version }
  }

  async uploadDefaultCover(filePath: string): Promise<ICloudinaryResults> {
    const result = await cloudinary.uploader.upload(filePath, {
      ...this.commonUploadOptions,
      public_id: 'default',
      quality: 'auto:eco', // hidden behind overlay no details quality needed (low even possible)
      format: 'jpg',
      eager: [{ width: 220, height: 330, crop: 'fill', gravity: 'center' }], // hiden behind overaly so no need a 2x size
      tags: ['default'],
    })

    console.log('default', result)

    return { publicId: result.public_id, version: result.version }
  }

  async destroy(publicId: string) {
    cloudinary.uploader.destroy(publicId, {
      invalidate: true,
    })
  }
}
