import type { MediaCategories } from '#enums/MediaTypes'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Genre extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare category: MediaCategories
}
