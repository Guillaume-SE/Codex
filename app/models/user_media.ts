import { UserMediaSchema } from '#database/schema'
import Collection from '#models/collection'
import Media from '#models/media'
import Status from '#models/status'
import User from '#models/user'
import { belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class UserMedia extends UserMediaSchema {
  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Media, {
    foreignKey: 'mediaId',
  })
  declare media: BelongsTo<typeof Media>

  @belongsTo(() => Status, {
    foreignKey: 'statusId',
  })
  declare status: BelongsTo<typeof Status>

  @manyToMany(() => Collection, {
    pivotTable: 'collection_media',
    pivotForeignKey: 'user_media_id',
    pivotRelatedForeignKey: 'collection_id',
    pivotTimestamps: true,
  })
  declare collections: ManyToMany<typeof Collection>
}
