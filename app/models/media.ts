import AnimeInfo from '#models/anime_info'
import BookInfo from '#models/book_info'
import Cover from '#models/cover'
import GameInfo from '#models/game_info'
import Genre from '#models/genre'
import MediaCategory from '#models/media_category'
import MediaContributor from '#models/media_contributor'
import MediaType from '#models/media_type'
import MovieInfo from '#models/movie_info'
import Review from '#models/review'
import SeriesInfo from '#models/series_info'
import { BaseModel, belongsTo, column, hasMany, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import MediaStatus from './media_status.js'

export default class Media extends BaseModel {
  public static table = 'media'
  // serializeExtras = true

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'media_parent_id', serializeAs: 'mediaParentId' })
  declare mediaParentId: number | null

  @column({ columnName: 'status_id', serializeAs: 'statusId' })
  declare statusId: number

  @column({ columnName: 'category_id', serializeAs: 'categoryId' })
  declare categoryId: number

  @column({ columnName: 'type_id' })
  declare typeId: number

  @column()
  declare name: string

  @column({ columnName: 'alternative_name', serializeAs: 'alternativeName' })
  declare alternativeName: string | null

  @column({ serializeAs: 'releasedDate' })
  declare released: string | null

  @column()
  declare synopsis: string | null

  //relations
  @hasMany(() => Media)
  declare parentMedia: HasMany<typeof Media>

  @belongsTo(() => Media, {
    foreignKey: 'mediaParentId',
  })
  declare childrenMedia: BelongsTo<typeof Media>

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

  @hasOne(() => Review)
  declare review: HasOne<typeof Review>

  @hasOne(() => Cover)
  declare cover: HasOne<typeof Cover>

  @hasOne(() => GameInfo)
  declare gameInfo: HasOne<typeof GameInfo>

  @hasOne(() => MovieInfo)
  declare movieInfo: HasOne<typeof MovieInfo>

  @hasOne(() => BookInfo)
  declare bookInfo: HasOne<typeof BookInfo>

  @hasOne(() => AnimeInfo)
  declare animeInfo: HasOne<typeof AnimeInfo>

  @hasOne(() => SeriesInfo)
  declare seriesInfo: HasOne<typeof SeriesInfo>

  @manyToMany(() => Genre, {
    pivotTable: 'media_genres',
    pivotTimestamps: false,
  })
  declare genres: ManyToMany<typeof Genre>

  @hasMany(() => MediaContributor, {
    foreignKey: 'mediaId',
  })
  declare contributors: HasMany<typeof MediaContributor>
}
