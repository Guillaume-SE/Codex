import Media from '#models/media'
import { BaseModel, beforeCreate, beforeUpdate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Review extends BaseModel {
  public static table = 'reviews'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'media_id', serializeAs: 'mediaId' })
  declare mediaId: number

  @column()
  declare rating: number | null

  @column()
  declare opinion: string | null

  @column({ columnName: 'is_favorite', serializeAs: 'isFavorite' })
  declare isFavorite: boolean

  @column({ columnName: 'updated_at', serializeAs: 'updatedAt' })
  declare updatedAt: number

  //relations
  @belongsTo(() => Media, {
    foreignKey: 'mediaId',
  })
  declare media: BelongsTo<typeof Media>

  // hooks
  @beforeCreate()
  static async defaultTimeStampValueOnCreate(review: Review) {
    review.updatedAt = Date.now()
  }
  @beforeUpdate()
  static async defaultTimeStampValueOnUpdate(review: Review) {
    review.updatedAt = Date.now()
  }
}
