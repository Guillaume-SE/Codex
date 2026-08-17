import { CategorySchema } from '#database/schema'
import Format from '#models/format'
import Media from '#models/media'
import { hasMany, hasManyThrough } from '@adonisjs/lucid/orm'
import type { HasMany, HasManyThrough } from '@adonisjs/lucid/types/relations'

export default class Category extends CategorySchema {
  @hasMany(() => Format, {
    foreignKey: 'categoryId',
  })
  declare formats: HasMany<typeof Format>

  @hasManyThrough([() => Media, () => Format])
  declare media: HasManyThrough<typeof Media>
}
