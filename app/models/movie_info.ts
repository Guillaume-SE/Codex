import Media from '#models/media'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class MovieInfo extends BaseModel {
  public static table = 'movies_infos'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'media_id' })
  declare mediaId: number

  @column()
  declare director: string

  @column()
  declare screenwriter: string

  @column()
  declare duration: number

  // RELATIONS
  @belongsTo(() => Media)
  declare media: BelongsTo<typeof Media>
}
