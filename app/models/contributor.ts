import Media from '#models/media'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Contributor extends BaseModel {
  public static table = 'contributors'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  // relations
  @hasMany(() => Media, {})
  declare workedOn: HasMany<typeof Media>
}
