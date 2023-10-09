import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { MediaTypes } from 'App/Helpers/Types/MediaTypes'

export default class Media extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  // media_parent_id HERE

  @column()
  public type: MediaTypes

  @column()
  public genre: Array<string>

  @column()
  public developer: string

  @column()
  public publisher: string

  @column()
  public author: string

  @column()
  public illustrator: string

  @column()
  public released: string

  @column()
  public synopsis: string

  @column()
  public duration: number

  @column()
  public episode: number

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  public updatedAt: DateTime
}
