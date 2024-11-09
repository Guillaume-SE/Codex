import Media from '#models/media'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class MovieInfo extends BaseModel {
  public static table = 'movies_infos'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'media_id', serializeAs: 'mediaId' })
  declare mediaId: number

  @column()
  declare duration: number | null

  // RELATIONS
  @belongsTo(() => Media, {
    foreignKey: 'mediaId',
  })
  declare media: BelongsTo<typeof Media>
}
