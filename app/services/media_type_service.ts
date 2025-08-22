import Media from '#models/media'
import MediaType from '#models/media_type'
import { updateMediaTypeValidator } from '#validators/media_type_validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type updatedData = Infer<typeof updateMediaTypeValidator>

@inject()
export default class MediaTypeService {
  public async storeOrUpdate(data: updatedData, typeId?: number | undefined) {
    const type = typeId ? await MediaType.findOrFail(typeId) : new MediaType()

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

  static async getFiltered(filters: { search?: string }, page: number = 1, results: number = 10) {
    const mediaQuery = await MediaType.query()
      .if(filters.search, (q) => {
        q.where((subQuery) => {
          subQuery.where('name', 'like', `%${filters.search}%`)
        })
      })
      .withCount('media')
      .orderBy('name', 'asc')
      .paginate(page, results)

    return mediaQuery
  }
}
