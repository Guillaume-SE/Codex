import Media from '#models/media'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Cover extends BaseModel {
  public static table = 'covers'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'media_id' })
  declare mediaId: number

  @column({ columnName: 'small_format', serializeAs: 'smallFormat' })
  declare smallFormat: string | null

  @column({ columnName: 'medium_format', serializeAs: 'mediumFormat' })
  declare mediumFormat: string

  @column({ columnName: 'raw_format', serializeAs: 'rawFormat' })
  declare rawFormat: string | null

  @column({ columnName: 'alternative_text', serializeAs: 'alternativeText' })
  declare alternativeText: string

  // relations
  @belongsTo(() => Media)
  declare media: BelongsTo<typeof Media>
}
