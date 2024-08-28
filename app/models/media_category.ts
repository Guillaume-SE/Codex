import type { MediaCategories } from '#enums/MediaCategories'
import Genre from '#models/genre'
import Media from '#models/media'
import MediaType from '#models/media_type'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class MediaCategory extends BaseModel {
  public static table = 'media_categories'

  @column({ isPrimary: true })
  declare id: number

  @column({})
  declare name: MediaCategories
  //RELATIONS
  @hasMany(() => Media)
  declare media: HasMany<typeof Media>

  @hasMany(() => MediaType)
  declare types: HasMany<typeof MediaType>

  @hasMany(() => Genre)
  declare genres: HasMany<typeof Genre>
}
