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
}
