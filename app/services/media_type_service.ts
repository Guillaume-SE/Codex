import Media from '#models/media'
import MediaType from '#models/media_type'
import { updateMediaTypeValidator } from '#validators/media_type_validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type updatedData = Infer<typeof updateMediaTypeValidator>

@inject()
export default class MediaTypeService {
  public async storeOrUpdate(data: updatedData, typeId?: number | undefined) {
    let type = new MediaType()
    if (typeId) {
      type = await MediaType.findOrFail(typeId)
    }
    await type.merge(data).save()
  }

  public async replaceAndDelete(oldTypeId: number, replacementTypeId: number): Promise<string> {
    const oldType = await MediaType.findOrFail(oldTypeId)
    const oldTypeName = oldType.name

    await Media.query().where('type_id', oldTypeId).update({ typeId: replacementTypeId })
    await oldType.delete()

    return oldTypeName
  }

  public async delete(typeId: number): Promise<string> {
    const type = await MediaType.findOrFail(typeId)
    const typeName = type.name
    const hasMediaUsingThisType = await Media.findBy('typeId', type.id)

    if (hasMediaUsingThisType) {
      throw new Error('Le type est utilisé par au moins 1 media, suppression impossible')
    }

    await type.delete()

    return typeName
  }
}
