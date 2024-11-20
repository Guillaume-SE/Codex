import Genre from '#models/genre'
import Media from '#models/media'
import MediaType from '#models/media_type'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import type { MediaCategories } from '../types/MediaCategories.js'

export default class MediaCategory extends BaseModel {
  public static table = 'media_categories'

  @column({ isPrimary: true })
  declare id: number

  @column({})
  declare name: MediaCategories

  //RELATIONS
  @hasMany(() => Media, {
    foreignKey: 'mediaId',
  })
  declare media: HasMany<typeof Media>

  @manyToMany(() => Genre, {
    pivotTable: 'category_genres',
    pivotForeignKey: 'category_id',
    pivotRelatedForeignKey: 'genre_id',
    pivotTimestamps: false,
  })
  declare genres: ManyToMany<typeof Genre>

  @manyToMany(() => MediaType, {
    pivotTable: 'category_types',
    pivotForeignKey: 'category_id',
    pivotRelatedForeignKey: 'type_id',
    pivotTimestamps: false,
  })
  declare types: ManyToMany<typeof MediaType>
}
