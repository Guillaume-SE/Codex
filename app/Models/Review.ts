import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
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

  @column.dateTime({
    autoCreate: true,
    columnName: 'created_at',
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    columnName: 'updated_at',
  })
  public updatedAt: DateTime

  //relations
  @belongsTo(() => Media, {})
  public media: BelongsTo<typeof Media>
}
