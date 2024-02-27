import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Media from 'App/Models/Media'

export default class BookInfo extends BaseModel {
  public static table = 'books_infos'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'media_id' })
  public mediaId: number

  @column()
  public author: string

  @column()
  public illustrator: string

  @column()
  public editor: string

  @column()
  public pages: number

  // RELATIONS
  @belongsTo(() => Media)
  public media: BelongsTo<typeof Media>
}
