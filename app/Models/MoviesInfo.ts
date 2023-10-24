import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MoviesInfo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'media_id'})
  public mediaId: number

  @column()
  public director: string

  @column()
  public screenwriter: string

  @column()
  public duration: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
