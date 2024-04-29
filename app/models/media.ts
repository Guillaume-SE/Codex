import type { MediaTypes } from '#enums/MediaTypes'
import BookInfo from '#models/book_info'
import Cover from '#models/cover'
import GameInfo from '#models/game_info'
import MovieInfo from '#models/movie_info'
import Review from '#models/review'
import SeasonInfo from '#models/season_info'
import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'

export default class Media extends BaseModel {
  public static table = 'media'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'media_parent_id' })
  declare mediaParentId: number | null

  @column()
  declare type: MediaTypes

  @column()
  declare name: string

  @column()
  declare released: string

  @column()
  declare synopsis: string

  //relations
  @hasMany(() => Media)
  declare parentMedia: HasMany<typeof Media>

  @belongsTo(() => Media)
  declare childrenMedia: BelongsTo<typeof Media>

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

  @hasOne(() => SeasonInfo)
  declare seasonInfo: HasOne<typeof SeasonInfo>
}
