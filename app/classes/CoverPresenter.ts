import Cover from '#models/cover'
import env from '#start/env'

export class CoverPresenter {
  private baseUrl = env.get('CLOUDINARY_BASE_URL')
  private extension = env.get('DEFAULT_COVER_EXTENSION')
  private version: number
  private cloudinaryId: string

  constructor(cover: Cover) {
    this.version = cover.latestVersion
    this.cloudinaryId = cover.cloudinaryIdentifier
  }

  smallCoverUrl() {
    const transformations = 'c_fill,g_center,h_330,w_220'
    return `${this.baseUrl}${transformations}/v${this.version}/${this.cloudinaryId}${this.extension}`
  }

  largeCoverUrl() {
    const transformations = 'c_fill,g_center,h_660,w_440'
    return `${this.baseUrl}${transformations}/v${this.version}/${this.cloudinaryId}${this.extension}`
  }

  static smallDefaultUrl() {
    const transformations = 'c_fill,g_center,h_330,w_220'
    const placeholderId = env.get('CLOUDINARY_PLACEHOLDER_ID')
    const baseUrl = env.get('CLOUDINARY_BASE_URL')
    return `${baseUrl}${transformations}/${placeholderId}.jpg`
  }

  static largeDefaultUrl() {
    const transformations = 'c_fill,g_center,h_660,w_440'
    const placeholderId = env.get('CLOUDINARY_PLACEHOLDER_ID')
    const baseUrl = env.get('CLOUDINARY_BASE_URL')
    return `${baseUrl}${transformations}/${placeholderId}.jpg`
  }
}
