import Media from '#models/media'
import MediaCategory from '#models/media_category'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Genre extends BaseModel {
  public static table = 'genres'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  //RELATIONS
  @manyToMany(() => Media, {
    pivotTable: 'media_genres',
    pivotForeignKey: 'genre_id',
    pivotRelatedForeignKey: 'media_id',
    pivotTimestamps: false,
  })
  declare media: ManyToMany<typeof Media>

  @manyToMany(() => MediaCategory, {
    pivotTable: 'category_genres',
    pivotForeignKey: 'genre_id',
    pivotRelatedForeignKey: 'category_id',
    pivotTimestamps: false,
  })
  declare categories: ManyToMany<typeof MediaCategory>
}
