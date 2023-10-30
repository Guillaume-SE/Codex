import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { GamePlateform } from 'App/Models/Enums/GamePlateform'
import Media from './Media'

export default class GameInfo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'media_id' })
  public mediaId: number

  @column()
  public developer: string

  @column()
  public publisher: string

  @column()
  public plateform: GamePlateform

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // RELATIONS
  @belongsTo(() => Media, {
    localKey: 'mediaId',
  })
  public media: BelongsTo<typeof Media>
}
