import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MovieInfo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'media_id'})
  public mediaId: number

  @column()
  public director: string | null

  @column()
  public screenwriter: string | null

  @column()
  public duration: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
