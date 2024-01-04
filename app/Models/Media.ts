import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  HasMany,
  HasOne,
  beforeSave,
  belongsTo,
  column,
  hasMany,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm'
import { MediaTypes } from 'App/Tools/Enums/MediaTypes'
import Review from 'App/Models/Review'
import GameInfo from 'App/Models/GameInfo'
import MovieInfo from 'App/Models/MovieInfo'
import { AttachmentContract, attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import Cover from 'App/Models/Cover'

export default class Media extends BaseModel {
  // force "medias" name because the term doesn't exist in english
  public static table = 'medias'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'media_parent_id' })
  public mediaParentId: number | null

  @column()
  public type: MediaTypes

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
  @hasMany(() => Media)
  public parentMedia: HasMany<typeof Media>

  @belongsTo(() => Media)
  public childrenMedia: BelongsTo<typeof Media>

  @hasOne(() => Review)
  public review: HasOne<typeof Review>

  @hasOne(() => Cover)
  public cover: HasOne<typeof Cover>

  @hasOne(() => GameInfo)
  public gameInfo: HasOne<typeof GameInfo>

  @hasOne(() => MovieInfo)
  public movieInfo: HasOne<typeof MovieInfo>

  // @hasOne(() => SeasonInfo)
  // public seasonInfo: HasOne<typeof SeasonInfo>

  // @hasOne(() => BookInfo)
  // public bookInfo: HasOne<typeof BookInfo>

  // @beforeSave()
  // public static async defaultValue(media: Media) {
  //   if (!media.synopsis) {
  //     media.synopsis = 'N/A'
  //   }
  //   if (!media.released) {
  //     media.released = 'N/A'
  //   }
  // }
}
