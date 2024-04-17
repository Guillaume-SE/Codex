import Media from '#models/media'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Cover extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'media_id' })
  declare mediaId: number

  @column()
  declare filename: string

  @column()
  declare alternative: string

  // relations
  @belongsTo(() => Media)
  declare media: BelongsTo<typeof Media>
}
