import AnimeInfo from '#models/anime_info'
import BookInfo from '#models/book_info'
import Cover from '#models/cover'
import GameInfo from '#models/game_info'
import Genre from '#models/genre'
import MediaCategory from '#models/media_category'
import MediaStatus from '#models/media_status'
import MediaType from '#models/media_type'
import MovieInfo from '#models/movie_info'
import Review from '#models/review'
import SeriesInfo from '#models/series_info'
import { BaseModel, beforeCreate, belongsTo, column, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Media extends BaseModel {
  public static table = 'media'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'status_id', serializeAs: 'statusId' })
  declare statusId: number

  @column({ columnName: 'category_id', serializeAs: 'categoryId' })
  declare categoryId: number

  @column({ columnName: 'type_id' })
  declare typeId: number

  @column()
  declare name: string

  @column.dateTime()
  declare released: DateTime | null

  @column()
  declare synopsis: string | null

  @column.dateTime({ columnName: 'created_at', serializeAs: 'createdAt' })
  declare createdAt: DateTime

  //relations

  @belongsTo(() => MediaStatus, {
    foreignKey: 'statusId',
  })
  declare status: BelongsTo<typeof MediaStatus>

  @belongsTo(() => MediaCategory, {
    foreignKey: 'categoryId',
  })
  declare category: BelongsTo<typeof MediaCategory>

  @belongsTo(() => MediaType, {
    foreignKey: 'typeId',
  })
  declare type: BelongsTo<typeof MediaType>

  @hasOne(() => Review, {
    foreignKey: 'mediaId',
  })
  declare review: HasOne<typeof Review>

  @hasOne(() => Cover, {
    foreignKey: 'mediaId',
  })
  declare cover: HasOne<typeof Cover>

  @hasOne(() => GameInfo, {
    foreignKey: 'mediaId',
  })
  declare gameInfo: HasOne<typeof GameInfo>

  @hasOne(() => MovieInfo, {
    foreignKey: 'mediaId',
  })
  declare movieInfo: HasOne<typeof MovieInfo>

  @hasOne(() => BookInfo, {
    foreignKey: 'mediaId',
  })
  declare bookInfo: HasOne<typeof BookInfo>

  @hasOne(() => AnimeInfo, {
    foreignKey: 'mediaId',
  })
  declare animeInfo: HasOne<typeof AnimeInfo>

  @hasOne(() => SeriesInfo, {
    foreignKey: 'mediaId',
  })
  declare seriesInfo: HasOne<typeof SeriesInfo>

  @manyToMany(() => Genre, {
    pivotTable: 'media_genres',
    pivotForeignKey: 'media_id',
    pivotRelatedForeignKey: 'genre_id',
    pivotTimestamps: false,
  })
  declare genres: ManyToMany<typeof Genre>

  // hooks
  @beforeCreate()
  static async setTimeOnCreate(media: Media) {
    media.createdAt = DateTime.now()
  }
}
