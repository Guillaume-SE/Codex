import { StatusSchema } from '#database/schema'
import UserMedia from '#models/user_media'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Status extends StatusSchema {
  @hasMany(() => UserMedia, {
    foreignKey: 'statusId',
  })
  declare trackedMedia: HasMany<typeof UserMedia>
}
