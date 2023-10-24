import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { MediaTypes } from 'App/Models/Enums/MediaTypes'
import { MediaCategory } from 'App/Models/Enums/MediaCategory'

export default class Media extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'media_parent_id' })
  public mediaParentId: number

  @column({ columnName: 'cover_id' })
  public coverId: number

  @column()
  public category: MediaCategory

  @column()
  public type: MediaTypes

  @column()
  public name: string

  // @column()
  // public developer: string

  // @column()
  // public publisher: string

  // @column()
  // public author: string

  // @column()
  // public illustrator: string

  // @column()
  // public duration: number

  @column()
  public released: string

  @column()
  public synopsis: string

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  public updatedAt: DateTime
}
