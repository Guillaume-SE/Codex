import Media from '#models/media'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class MediaStatus extends BaseModel {
  public static table = 'media_statuses'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  //relations
  @hasMany(() => Media)
  declare media: HasMany<typeof Media>
}
