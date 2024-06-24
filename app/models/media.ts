import AnimeInfo from '#models/anime_info'
import BookInfo from '#models/book_info'
import Cover from '#models/cover'
import GameInfo from '#models/game_info'
import MediaCategory from '#models/media_category'
import MediaType from '#models/media_type'
import MovieInfo from '#models/movie_info'
import Review from '#models/review'
import SeriesInfo from '#models/series_info'
import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import MediaContributor from './media_contributor.js'

export default class Media extends BaseModel {
  public static table = 'media'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'media_parent_id', serializeAs: 'mediaParentId' })
  declare mediaParentId: number | null

  @column({ columnName: 'category_id', serializeAs: 'categoryId' })
  declare categoryId: number

  @column({ columnName: 'type_id', serializeAs: 'typeId' })
  declare typeId: number

  @column()
  declare name: string

  @column()
  declare released: string

  @column()
  declare synopsis: string | null

  //relations
  @hasMany(() => Media)
  declare parentMedia: HasMany<typeof Media>

  @belongsTo(() => Media)
  declare childrenMedia: BelongsTo<typeof Media>

  @belongsTo(() => MediaCategory)
  declare category: BelongsTo<typeof MediaCategory>

  @belongsTo(() => MediaType)
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

  @hasMany(() => MediaContributor, {})
  declare mediaProject: HasMany<typeof MediaContributor>
}
