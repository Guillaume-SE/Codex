import string from '@adonisjs/core/helpers/string'
import { PathLike } from 'fs'
import sharp from 'sharp'

export class CoverUtils {
  static resize(path: string, width: number) {
    const coverResized = sharp(path)
      .resize({
        // height: 500,
        width: width,
        // fit: 'cover',
        // position: 'top',
      })
      .toFormat('jpg', { mozjpeg: true })
      .toBuffer()
    return coverResized
  }

  static toBuffer(path: string) {
    return sharp(path).toBuffer()
  }

  static createFileName(name: string, fileExtension: string | PathLike, withRaw: boolean): string {
    if (withRaw) {
      return `${name}-raw${fileExtension}`
    }
    return `${name}${fileExtension}`
  }

  static generateUniqueString() {
    const timestamp = new Date().getTime().toString()
    const randomString = string.random(15)

    return `${timestamp}-${randomString}`
  }
}
