import { CollectionSchema } from '#database/schema'
import User from '#models/user'
import UserMedia from '#models/user_media'
import { belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Collection extends CollectionSchema {
  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  @manyToMany(() => UserMedia, {
    pivotTable: 'collection_media',
    pivotForeignKey: 'collection_id',
    pivotRelatedForeignKey: 'user_media_id',
    pivotTimestamps: true,
  })
  declare trackedMedia: ManyToMany<typeof UserMedia>
}
