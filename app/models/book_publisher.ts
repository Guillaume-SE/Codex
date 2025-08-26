import BookInfo from '#models/book_info'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class BookPublisher extends BaseModel {
  public static table = 'book_publishers'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  //relations
  @hasMany(() => BookInfo, {
    foreignKey: 'publisherId',
  })
  declare bookInfo: HasMany<typeof BookInfo>
}
