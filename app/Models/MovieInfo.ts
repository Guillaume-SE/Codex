import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Media from 'App/Models/Media'

export default class MovieInfo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'media_id' })
  public mediaId: number

  @column()
  public director: string

  @column()
  public screenwriter: string

  @column()
  public duration: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // RELATIONS
  @belongsTo(() => Media, {
    localKey: 'mediaId',
  })
  public media: BelongsTo<typeof Media>
}
