import Media from '#models/media'
import MediaCategory from '#models/media_category'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Genre extends BaseModel {
  public static table = 'genres'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column({ columnName: 'category_id', serializeAs: 'categoryId' })
  declare categoryId: number

  //RELATIONS
  @belongsTo(() => MediaCategory)
  declare category: BelongsTo<typeof MediaCategory>

  @manyToMany(() => Media, {
    pivotTable: 'media_genres',
    pivotTimestamps: false,
  })
  declare mediaGenres: ManyToMany<typeof Media>
}
