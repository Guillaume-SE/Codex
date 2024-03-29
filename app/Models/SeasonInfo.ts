import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Media from 'App/Models/Media'

export default class SeasonInfo extends BaseModel {
  public static table = 'seasons_infos'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'media_id' })
  public mediaId: number

  @column()
  public creator: string

  @column()
  public length: number

  // RELATIONS
  @belongsTo(() => Media)
  public media: BelongsTo<typeof Media>
}
