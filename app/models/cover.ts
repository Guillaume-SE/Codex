import Media from '#models/media'
import env from '#start/env'
import { BaseModel, belongsTo, column, computed } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { PathLike } from 'node:fs'

export default class Cover extends BaseModel {
  public static table = 'covers'
  protected ORIGINAL_COVER_DIR: string | PathLike = env.get('ORIGINAL_COVER_DIR')
  protected SMALL_COVER_DIR: string | PathLike = env.get('SMALL_COVER_DIR')
  protected MEDIUM_COVER_DIR: string | PathLike = env.get('MEDIUM_COVER_DIR')
  protected LARGE_COVER_DIR: string | PathLike = env.get('LARGE_COVER_DIR')

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'media_id' })
  declare mediaId: number

  @column({ columnName: 'original_cover_filename', serializeAs: 'originalCoverFilename' })
  declare originalCoverFilename: string

  @column({ columnName: 'small_cover_filename', serializeAs: 'smallCoverFilename' })
  declare smallCoverFilename: string

  @column({ columnName: 'medium_cover_filename', serializeAs: 'mediumCoverFilename' })
  declare mediumCoverFilename: string

  @column({ columnName: 'large_cover_filename', serializeAs: 'largeCoverFilename' })
  declare largeCoverFilename: string

  // additional logic
  @computed()
  get originalCoverUrl() {
    return `${this.ORIGINAL_COVER_DIR}${this.originalCoverFilename}`
  }

  @computed()
  get smallCoverUrl() {
    return `${this.SMALL_COVER_DIR}${this.smallCoverFilename}`
  }

  @computed()
  get mediumCoverUrl() {
    return `${this.MEDIUM_COVER_DIR}${this.mediumCoverFilename}`
  }

  @computed()
  get largeCoverUrl() {
    return `${this.LARGE_COVER_DIR}${this.largeCoverFilename}`
  }

  // relations
  @belongsTo(() => Media, {
    foreignKey: 'mediaId',
  })
  declare media: BelongsTo<typeof Media>
}
