import Media from '#models/media'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Cover extends BaseModel {
  public static table = 'covers'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'media_id' })
  declare mediaId: number

  @column({ columnName: 'cloudinary_identifier', serializeAs: 'cloudinaryIdentifier' })
  declare cloudinaryIdentifier: string

  @column({ columnName: 'latest_version', serializeAs: 'latestVersion' })
  declare latestVersion: number

  // relations
  @belongsTo(() => Media, {
    foreignKey: 'mediaId',
  })
  declare media: BelongsTo<typeof Media>
}
