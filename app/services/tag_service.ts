import type { ITag } from '#interfaces/tag_interface'
import Tag from '#models/tag'
import { inject } from '@adonisjs/core'

@inject()
export default class TagService {
  public async store(tag: ITag) {
    const newTag = await Tag.create(tag)
    return newTag
  }

  public async update(updatedTag: ITag, tagId: number) {
    const tag = await Tag.findOrFail(tagId)

    await tag.merge(updatedTag).save()

    return tag
  }

  public async delete(tagId: number): Promise<void> {
    const tag = await Tag.findOrFail(tagId)
    const defaultTag = await Tag.findBy('name', 'autre')

    if (!defaultTag) {
      throw new Error('Aucun tag par défaut trouvé, suppression impossible')
    }

    if (tag.id === defaultTag.id) {
      throw new Error('Impossible de supprimer le tag par défaut')
    }

    await tag.delete()
  }
}
