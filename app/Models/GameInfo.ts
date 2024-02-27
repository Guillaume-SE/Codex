import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { GamePlateform } from 'App/Tools/Enums/GamePlatform'
import Media from 'App/Models/Media'

export default class GameInfo extends BaseModel {
  public static table = 'games_infos'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'media_id' })
  public mediaId: number

  @column()
  public developer: string

  @column()
  public publisher: string

  @column()
  public platform: GamePlateform

  // RELATIONS
  @belongsTo(() => Media)
  public media: BelongsTo<typeof Media>
}
