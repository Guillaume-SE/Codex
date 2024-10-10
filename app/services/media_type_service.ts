import type { IMediaType } from '#interfaces/media_type_interface'
import MediaType from '#models/media_type'
import { inject } from '@adonisjs/core'

@inject()
export default class MediaTypeService {
  public async store(type: IMediaType) {
    const newType = await MediaType.create(type)
    return newType
  }

  public async update(updatedType: IMediaType, typeId: number) {
    const type = await MediaType.findOrFail(typeId)

    await type.merge(updatedType).save()

    return type
  }
}
