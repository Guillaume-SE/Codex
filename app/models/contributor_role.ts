import MediaContributor from '#models/media_contributor'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class ContributorRole extends BaseModel {
  public static table = 'contributors_roles'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  // relations
  @hasMany(() => MediaContributor, {
    foreignKey: 'roleId',
  })
  declare role: HasMany<typeof MediaContributor>
}
