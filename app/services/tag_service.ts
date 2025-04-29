import Tag from '#models/tag'
import { updateTagValidator } from '#validators/tag_validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type updatedData = Omit<Infer<typeof updateTagValidator>, 'params'>

@inject()
export default class TagService {
  public async storeOrUpdate(data: updatedData, tagId?: number | undefined) {
    let tag = new Tag()
    if (tagId) {
      tag = await Tag.findOrFail(tagId)
    }
    await tag.merge(data).save()
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
