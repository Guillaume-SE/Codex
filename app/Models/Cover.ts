import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Media from 'App/Models//Media'

export default class Cover extends BaseModel {
  public static table = 'covers'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'media_id' })
  public mediaId: number

  @column()
  public filename: string

  @column()
  public alternative: string

  // RELATIONS
  @belongsTo(() => Media)
  public media: BelongsTo<typeof Media>
}
