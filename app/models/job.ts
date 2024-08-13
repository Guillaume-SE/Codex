import MediaContributor from '#models/media_contributor'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Job extends BaseModel {
  public static table = 'jobs'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  // relations
  @hasMany(() => MediaContributor, {
    foreignKey: 'jobId',
  })
  declare contributorJob: HasMany<typeof MediaContributor>
}
