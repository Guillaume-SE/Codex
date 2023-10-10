import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Thumbnail extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'media_id' })
  public mediaId: number

  @column()
  public name: string

  @column()
  public path: string

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  public updatedAt: DateTime
}