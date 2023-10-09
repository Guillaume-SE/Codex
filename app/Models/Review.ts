import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { ReviewStatus } from 'App/Helpers/Types/ReviewStatus'

export default class Review extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  // user_id

  // media_id

  @column()
  public plateform: string

  @column()
  public status: ReviewStatus

  @column()
  public rated: number

  @column({ columnName: 'is_favorite'})
  public isFavorite: boolean

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at'  })
  public updatedAt: DateTime
}
