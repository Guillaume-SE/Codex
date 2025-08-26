import BookPublisher from '#models/book_publisher'
import Media from '#models/media'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class BookInfo extends BaseModel {
  public static table = 'books_infos'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'media_id', serializeAs: 'mediaId' })
  declare mediaId: number

  @column({ columnName: 'publisher_id', serializeAs: 'publisherId' })
  declare publisherId: number | null

  // RELATIONS
  @belongsTo(() => Media, {
    foreignKey: 'mediaId',
  })
  declare media: BelongsTo<typeof Media>

  @belongsTo(() => BookPublisher, {
    foreignKey: 'publisherId',
  })
  declare bookPublisher: BelongsTo<typeof BookPublisher>
}
