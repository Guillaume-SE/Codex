import Media from '#models/media'
import env from '#start/env'
import { BaseModel, belongsTo, column, computed } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { PathLike } from 'node:fs'

export default class Cover extends BaseModel {
  public static table = 'covers'
  protected RESIZED_COVER_DIR: string | PathLike = env.get('RESIZED_COVER_DIR')
  protected ORIGINAL_COVER_DIR: string | PathLike = env.get('ORIGINAL_COVER_DIR')

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'media_id' })
  declare mediaId: number

  @column({ columnName: 'resized_cover_filename', serializeAs: 'resizedCoverFilename' })
  declare resizedCoverFilename: string

  @column({ columnName: 'original_cover_filename', serializeAs: 'originalCoverFilename' })
  declare originalCoverFilename: string

  // additional logic
  @computed()
  get resizedCoverUrl() {
    return `${this.RESIZED_COVER_DIR}${this.resizedCoverFilename}`
  }

  @computed()
  get originalCoverUrl() {
    return `${this.ORIGINAL_COVER_DIR}${this.originalCoverFilename}`
  }

  // relations
  @belongsTo(() => Media)
  declare media: BelongsTo<typeof Media>
}
