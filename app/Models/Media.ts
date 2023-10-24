import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { MediaTypes } from 'App/Models/Enums/MediaTypes'
import { MediaCategory } from 'App/Models/Enums/MediaCategory'
import Review from 'App/Models/Review'

export default class Media extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'media_parent_id' })
  public mediaParentId: number | null

  @column({ columnName: 'cover_id' })
  public coverId: number

  @column()
  public category: MediaCategory

  @column()
  public type: MediaTypes | null

  @column()
  public name: string

  @column()
  public released: string | null

  @column()
  public synopsis: string |null

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  public updatedAt: DateTime

  //relation
  @hasOne(() => Review)
  public review: HasOne<typeof Review>
}
