import Media from '#models/media'
import MediaCategory from '#models/media_category'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class MediaType extends BaseModel {
  public static table = 'media_types'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  // RELATIONS
  @hasMany(() => Media, {
    foreignKey: 'mediaId',
  })
  declare media: HasMany<typeof Media>

  @manyToMany(() => MediaCategory, {
    pivotTable: 'category_types',
    pivotForeignKey: 'type_id',
    pivotRelatedForeignKey: 'category_id',
    pivotTimestamps: false,
  })
  declare categories: ManyToMany<typeof MediaCategory>
}
