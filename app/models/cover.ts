import Media from '#models/media'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Cover extends BaseModel {
  public static table = 'covers'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'media_id' })
  declare mediaId: number

  @column()
  declare filename: string

  @column({ columnName: 'filename_raw' })
  declare filenameRaw: string | null

  @column()
  declare alternative: string

  // relations
  @belongsTo(() => Media)
  declare media: BelongsTo<typeof Media>
}
