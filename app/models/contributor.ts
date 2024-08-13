import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import MediaContributor from './media_contributor.js'

export default class Contributor extends BaseModel {
  public static table = 'contributors'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  // relations
  @hasMany(() => MediaContributor, {
    // foreignKey: 'contributorId',
  })
  declare workedOn: HasMany<typeof MediaContributor>
}
