import env from '#start/env'
import { cuid } from '@adonisjs/core/helpers'
import { PathLike } from 'fs'
import sharp from 'sharp'

interface IProcessImageOptions {
  width?: number
  height?: number
  format: keyof sharp.FormatEnum
}

interface ICoverFilenames {
  original: string
  small: string
  medium: string
  large: string
}

export class CoverUtils {
  protected DEFAULT_COVER_EXTENSION: string | PathLike = env.get('DEFAULT_COVER_EXTENSION')
  protected ORIGINAL_COVER_DIR: string | PathLike = env.get('ORIGINAL_COVER_DIR')
  protected SMALL_COVER_DIR: string | PathLike = env.get('SMALL_COVER_DIR')
  protected MEDIUM_COVER_DIR: string | PathLike = env.get('MEDIUM_COVER_DIR')
  protected LARGE_COVER_DIR: string | PathLike = env.get('LARGE_COVER_DIR')

  async getFileDimensions(filepath: string) {
    const dimensions = await sharp(filepath).metadata()
    return {
      width: dimensions.width,
      height: dimensions.height,
    }
  }

  async processImage(filePath: string, options: IProcessImageOptions) {
    return sharp(filePath)
      .resize({
        width: options.width,
        height: options.height,
        fit: 'cover',
      })
      .toFormat('jpg', { mozjpeg: true })
      .toBuffer()
  }

  createFilenames(): ICoverFilenames {
    const key = cuid()
    return {
      original: `${key}${this.DEFAULT_COVER_EXTENSION}`,
      small: `${key}-150x225${this.DEFAULT_COVER_EXTENSION}`,
      medium: `${key}-300x450${this.DEFAULT_COVER_EXTENSION}`,
      large: `${key}-large${this.DEFAULT_COVER_EXTENSION}`,
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
