import { ProviderSchema } from '#database/schema'
import Media from '#models/media'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Provider extends ProviderSchema {
  @hasMany(() => Media, {
    foreignKey: 'providerId',
  })
  declare media: HasMany<typeof Media>
}
