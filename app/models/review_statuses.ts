import Review from '#models/review'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class ReviewStatuses extends BaseModel {
  public static table = 'review_statuses'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  //relations
  @hasMany(() => Review)
  declare review: HasMany<typeof Review>
}
