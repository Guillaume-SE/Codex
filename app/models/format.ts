import { FormatSchema } from '#database/schema'
import Category from '#models/category'
import Media from '#models/media'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class Format extends FormatSchema {
  @belongsTo(() => Category, {
    foreignKey: 'categoryId',
  })
  declare category: BelongsTo<typeof Category>

  @hasMany(() => Media, {
    foreignKey: 'formatId',
  })
  declare media: HasMany<typeof Media>
}
