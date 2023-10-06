import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Media extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  // thumbnail id HERE
  // media_parent_id HERE

  @column()
  public type: string

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
