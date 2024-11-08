import GameInfo from '#models/game_info'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class GamePlatform extends BaseModel {
  public static table = 'game_platforms'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  //relations
  @hasMany(() => GameInfo, {
    foreignKey: 'platformId',
  })
  declare gameInfo: HasMany<typeof GameInfo>
}
