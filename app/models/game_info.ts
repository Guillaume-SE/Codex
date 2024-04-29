import type { GamePlatform } from '#enums/GamePlatform'
import Media from '#models/media'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class GameInfo extends BaseModel {
  public static table = 'games_infos'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'media_id' })
  declare mediaId: number

  @column()
  declare developer: string

  @column()
  declare publisher: string

  @column()
  declare platform: GamePlatform

  // RELATIONS
  @belongsTo(() => Media)
  declare media: BelongsTo<typeof Media>
}
