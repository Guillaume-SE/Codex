import Media from '#models/media'
import MediaType from '#models/media_type'
import { updateMediaTypeValidator } from '#validators/media_type_validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type updatedData = Omit<Infer<typeof updateMediaTypeValidator>, 'params'>

@inject()
export default class MediaTypeService {
  public async storeOrUpdate(data: updatedData, typeId?: number | undefined) {
    let type = new MediaType()
    if (typeId) {
      type = await MediaType.findOrFail(typeId)
    }
    await type.merge(data).save()
  }

  public async replaceAndDelete(oldTypeId: number, newTypeId: number) {
    const oldType = await MediaType.findOrFail(oldTypeId)
    const newType = await MediaType.findOrFail(newTypeId)

    const mediaUsingOldType = await Media.query().where('type_id', '=', oldType.id)

    for (let media of mediaUsingOldType) {
      media.typeId = newType.id
      await media.save()
    }

    await oldType.delete()
  }

  public async delete(typeId: number) {
    const type = await MediaType.findOrFail(typeId)
    const hasMediaUsingThisType = await Media.findBy('typeId', type.id)

    if (hasMediaUsingThisType) {
      throw new Error('Le type est utilisé par au moins 1 media, suppression impossible')
    }

    await type.delete()
  }
}
