import Media from '#models/media'
import type { MediaStatuses } from '#types/MediaStatuses'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class MediaStatus extends BaseModel {
  public static table = 'media_statuses'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: MediaStatuses

  //relations
  @hasMany(() => Media, {
    foreignKey: 'statusId',
  })
  declare media: HasMany<typeof Media>
}
