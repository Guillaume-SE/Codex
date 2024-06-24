import Media from '#models/media'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class AnimeInfo extends BaseModel {
  public static table = 'anime_infos'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'media_id', serializeAs: 'mediaId' })
  declare mediaId: number

  @column({ columnName: 'alternative_name', serializeAs: 'alternativeName' })
  declare alternativeName: string

  @column()
  declare length: number

  // RELATIONS
  @belongsTo(() => Media)
  declare media: BelongsTo<typeof Media>
}
