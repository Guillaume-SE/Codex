import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  beforeCreate,
  beforeUpdate,
} from '@ioc:Adonis/Lucid/Orm'
import { ReviewStatus } from 'App/Tools/Enums/ReviewStatus'
import Media from 'App/Models/Media'

export default class Review extends BaseModel {
  public static table = 'reviews'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'media_id' })
  public mediaId: number

  @column()
  public status: ReviewStatus

  @column()
  public rating: number | null

  @column()
  public opinion: string | null

  @column({ columnName: 'is_favorite' })
  public isFavorite: boolean

  @column({ columnName: 'created_at' })
  public createdAt: number

  @column({ columnName: 'updated_at' })
  public updatedAt: number

  //relations
  @belongsTo(() => Media, {})
  public media: BelongsTo<typeof Media>

  @beforeCreate()
  public static async defaultTimeStampValueOnCreate(review: Review) {
    review.createdAt = Date.now()
    review.updatedAt = Date.now()
  }
  @beforeUpdate()
  public static async defaultTimeStampValueOnUpdate(review: Review) {
    review.updatedAt = Date.now()
  }
}
