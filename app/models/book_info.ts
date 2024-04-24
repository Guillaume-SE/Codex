import Media from '#models/media'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class BookInfo extends BaseModel {
  public static table = 'books_infos'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'media_id' })
  declare mediaId: number

  @column()
  declare author: string

  @column()
  declare illustrator: string | null

  @column()
  declare editor: string

  @column()
  declare pages: number

  // RELATIONS
  @belongsTo(() => Media)
  declare media: BelongsTo<typeof Media>
}
