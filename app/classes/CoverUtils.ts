import type { ICoverFilenames } from '#interfaces/cover_interface'
import env from '#start/env'
import { cuid } from '@adonisjs/core/helpers'
import { PathLike } from 'fs'
import sharp from 'sharp'

interface IProcessImageOptions {
  width?: number
  height?: number
  format: keyof sharp.FormatEnum
}

export class CoverUtils {
  protected DEFAULT_COVER_EXTENSION: string | PathLike = env.get('DEFAULT_COVER_EXTENSION')
  protected ORIGINAL_COVER_DIR: string | PathLike = env.get('ORIGINAL_COVER_DIR')
  protected SMALL_COVER_DIR: string | PathLike = env.get('SMALL_COVER_DIR')
  protected MEDIUM_COVER_DIR: string | PathLike = env.get('MEDIUM_COVER_DIR')
  protected LARGE_COVER_DIR: string | PathLike = env.get('LARGE_COVER_DIR')

  async processImage(filepath: string, options?: IProcessImageOptions) {
    const image = sharp(filepath)

    if (options?.width || options?.height) {
      image.resize({
        width: options.width,
        height: options.height,
        fit: 'cover',
      })
    }

    if (options?.format) {
      if (options.format === 'jpg') {
        image.toFormat(options.format, { mozjpeg: true })
      } else {
        image.toFormat(options.format)
      }
    }
    image.toBuffer()

    return image
  }

  createFilenames(): ICoverFilenames {
    const key = cuid()
    return {
      original: `${key}${this.DEFAULT_COVER_EXTENSION}`,
      small: `${key}-150x225${this.DEFAULT_COVER_EXTENSION}`,
      medium: `${key}-300x450${this.DEFAULT_COVER_EXTENSION}`,
      large: `${key}-600x900${this.DEFAULT_COVER_EXTENSION}`,
    }
  }

  getFullPaths(filenames: ICoverFilenames) {
    return {
      original: `${this.ORIGINAL_COVER_DIR}${filenames.original}`,
      small: `${this.SMALL_COVER_DIR}${filenames.small}`,
      medium: `${this.MEDIUM_COVER_DIR}${filenames.medium}`,
      large: `${this.LARGE_COVER_DIR}${filenames.large}`,
    }
  }
}
