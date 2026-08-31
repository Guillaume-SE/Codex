import { MediaSchema } from '#database/schema'
import Format from '#models/format'
import Provider from '#models/provider'
import UserMedia from '#models/user_media'
import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Media extends MediaSchema {
  // declared here to allow autoCreate args on this specific column
  @column.dateTime({ autoCreate: true })
  declare lastSyncedAt: DateTime

  @belongsTo(() => Provider, {
    foreignKey: 'providerId',
  })
  declare provider: BelongsTo<typeof Provider>

  @belongsTo(() => Format, {
    foreignKey: 'formatId',
  })
  declare format: BelongsTo<typeof Format>

  @hasMany(() => UserMedia, {
    foreignKey: 'mediaId',
  })
  declare trackedBy: HasMany<typeof UserMedia>
}
