import Cover from '#models/cover'
import env from '#start/env'

export class CoverPresenter {
  private baseUrl = env.get('CLOUDINARY_BASE_URL')
  private readonly REAL_COVER_EXTENSION = '.webp'
  private static readonly PLACEHOLDER_ID = 'default'
  private static readonly PLACEHOLDER_EXTENSION = '.jpg'
  private version: number
  private cloudinaryId: string

  constructor(cover: Cover) {
    this.version = cover.latestVersion
    this.cloudinaryId = cover.cloudinaryIdentifier
  }

  smallCoverUrl() {
    const transformations = 'c_fill,g_center,h_330,w_220'
    return `${this.baseUrl}${transformations}/v${this.version}/${this.cloudinaryId}${this.REAL_COVER_EXTENSION}`
  }

  largeCoverUrl() {
    const transformations = 'c_fill,g_center,h_660,w_440'
    return `${this.baseUrl}${transformations}/v${this.version}/${this.cloudinaryId}${this.REAL_COVER_EXTENSION}`
  }

  static defaultCoverUrl() {
    const transformations = 'c_fill,g_center,h_330,w_220'
    const baseUrl = env.get('CLOUDINARY_BASE_URL')
    return `${baseUrl}${transformations}/${this.PLACEHOLDER_ID}${this.PLACEHOLDER_EXTENSION}`
  }
}
