import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  HasMany,
  HasOne,
  belongsTo,
  column,
  hasMany,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm'
import { MediaTypes } from 'App/Models/Enums/MediaTypes'
import { MediaCategory } from 'App/Models/Enums/MediaCategory'
import Review from 'App/Models/Review'
import Cover from 'App/Models/Cover'
import GameInfo from 'App/Models/GameInfo'
import MovieInfo from 'App/Models/MovieInfo'

export default class Media extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'media_parent_id' })
  public mediaParentId: number | null

  @column({ columnName: 'cover_id' })
  public coverId: number

  @column()
  public category: MediaCategory

  @column()
  public type: MediaTypes | null

  @column()
  public name: string

  @column()
  public released: string

  @column()
  public synopsis: string

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  public updatedAt: DateTime

  // RELATIONS
  @hasMany(() => Media, {
    foreignKey: 'mediaParentId',
  })
  public parentMedia: HasMany<typeof Media>

  @belongsTo(() => Media, {
    foreignKey: 'mediaParentId',
  })
  public childrenMedia: BelongsTo<typeof Media>

  @belongsTo(() => Cover, {
    localKey: 'coverId',
  })
  public cover: BelongsTo<typeof Cover>

  @hasOne(() => Review, {
    foreignKey: 'mediaId',
  })
  public review: HasOne<typeof Review>

  @hasOne(() => GameInfo, {
    foreignKey: 'mediaId',
  })
  public gameInfo: HasOne<typeof GameInfo>

  @hasOne(() => MovieInfo, {
    foreignKey: 'mediaId',
  })
  public movieInfo: HasOne<typeof MovieInfo>
}
// @hasOne(() => SeasonInfo)
// public seasonInfo: HasOne<typeof SeasonInfo>

// @hasOne(() => BookInfo)
// public bookInfo: HasOne<typeof BookInfo>
