import GamePlatform from '#models/game_platform'
import Media from '#models/media'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class GameInfo extends BaseModel {
  public static table = 'games_infos'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'media_id', serializeAs: 'mediaId' })
  declare mediaId: number

  @column({ columnName: 'platform_id', serializeAs: 'platformId' })
  declare platformId: number

  // RELATIONS
  @belongsTo(() => Media)
  declare media: BelongsTo<typeof Media>

  @belongsTo(() => GamePlatform)
  declare gamePlatform: BelongsTo<typeof GamePlatform>
}
