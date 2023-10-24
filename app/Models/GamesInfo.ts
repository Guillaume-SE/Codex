import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { GamePlateform } from 'App/Models/Enums/GamePlateform'

export default class GamesInfo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'media_id'})
  public mediaId: number

  @column()
  public developer: string | null

  @column()
  public publisher: string | null

  @column()
  public plateform: GamePlateform

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
