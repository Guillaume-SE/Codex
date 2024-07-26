import Media from '#models/media'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Cover extends BaseModel {
  public static table = 'covers'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'media_id' })
  declare mediaId: number

  @column({ columnName: 'resized_version', serializeAs: 'resizedVersion' })
  declare resizedVersion: string

  @column({ columnName: 'raw_version', serializeAs: 'rawVersion' })
  declare rawVersion: string

  // relations
  @belongsTo(() => Media)
  declare media: BelongsTo<typeof Media>
}
