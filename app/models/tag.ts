import Media from '#models/media'
import { BaseModel, beforeDelete, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Tag extends BaseModel {
  public static table = 'tags'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  //relations
  @hasMany(() => Media, {
    foreignKey: 'mediaId',
  })
  declare media: HasMany<typeof Media>

  //hook
  @beforeDelete()
  static async setTagToDefault(tag: Tag) {
    const defaultTag = await Tag.query().where('name', '=', 'autre').first()
    const mediaUsingDeletedTag = await Media.query().where('tag_id', '=', tag.id)

    if (!defaultTag) {
      throw new Error('Aucun tag par défaut trouvé. Suppression impossible')
    }

    for (let media of mediaUsingDeletedTag) {
      media.tagId = defaultTag.id
      await media.save()
    }
  }
}
