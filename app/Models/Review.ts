import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { ReviewStatus } from 'App/Helpers/Interfaces/ReviewStatus'
import { GamePlateform } from 'App/Helpers/Interfaces/GamePlateform'

export default class Review extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'user_id' })
  public userId: number

  @column({ columnName: 'media_id' })
  public mediaId: number

  @column()
  public plateform: GamePlateform

  @column()
  public status: ReviewStatus

  @column()
  public rating: number

  @column()
  public notes: string

  @column({ columnName: 'is_favorite'})
  public isFavorite: boolean

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at'  })
  public updatedAt: DateTime
}
