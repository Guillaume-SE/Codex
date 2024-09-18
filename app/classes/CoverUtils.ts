import env from '#start/env'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import { cuid } from '@adonisjs/core/helpers'
import { PathLike } from 'fs'
import sharp from 'sharp'

interface ProcessImageOptions {
  width: number
  height: number
  format: keyof sharp.FormatEnum
}

export class CoverUtils {
  static DEFAULT_COVER_EXTENSION: string | PathLike = env.get('DEFAULT_COVER_EXTENSION')

  static resize(path: string, width: number) {
    const coverResized = sharp(path)
      .resize({
        height: 450,
        width: width,
      })
      .toFormat('jpg', { mozjpeg: true })
      .toBuffer()
    return coverResized
  }

  static toBuffer(path: string) {
    return sharp(path).toBuffer()
  }

  // static async processImage(file: MultipartFile, options?: ProcessImageOptions) {
  //   if (file.tmpPath) {
  //     const image = sharp(file.tmpPath)

  //     if (options?.width || options?.height) {
  //       image.resize({
  //         width: options.width,
  //         height: options.height,
  //         fit: 'cover',
  //       })
  //     }

  //     if (options?.format) {
  //       image.toFormat(options.format)
  //     }

  //     const buffer = await image.toBuffer()
  //     await sharp(buffer).toFile(file.tmpPath)
  //   }
  // }

  static createFilenames() {
    const key = cuid()

    return {
      original: `${key}${this.DEFAULT_COVER_EXTENSION}`,
      resized: `${key}-resized${this.DEFAULT_COVER_EXTENSION}`,
    }
  }
}
