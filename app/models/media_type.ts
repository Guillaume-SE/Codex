import Media from '#models/media'
import MediaCategory from '#models/media_category'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class MediaType extends BaseModel {
  public static table = 'media_types'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column({ columnName: 'category_id', serializeAs: 'categoryId' })
  declare categoryId: number

  // RELATIONS
  @belongsTo(() => MediaCategory)
  declare category: BelongsTo<typeof MediaCategory>

  @hasMany(() => Media)
  declare media: HasMany<typeof Media>
}
