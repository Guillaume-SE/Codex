import type { ReviewStatus } from '#enums/ReviewStatus'
import Media from '#models/media'
import { BaseModel, beforeCreate, beforeUpdate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Review extends BaseModel {
  public static table = 'reviews'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'media_id' })
  declare mediaId: number

  @column()
  declare status: ReviewStatus

  @column()
  declare rating: number | null

  @column()
  declare opinion: string | null

  @column({ columnName: 'is_favorite' })
  declare isFavorite: boolean

  @column({ columnName: 'created_at' })
  declare createdAt: number

  @column({ columnName: 'updated_at' })
  declare updatedAt: number

  //relations
  @belongsTo(() => Media, {})
  declare media: BelongsTo<typeof Media>

  @beforeCreate()
  static async defaultTimeStampValueOnCreate(review: Review) {
    review.createdAt = Date.now()
    review.updatedAt = Date.now()
  }
  @beforeUpdate()
  static async defaultTimeStampValueOnUpdate(review: Review) {
    review.updatedAt = Date.now()
  }
}
