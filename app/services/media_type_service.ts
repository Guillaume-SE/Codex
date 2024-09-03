import { IMediaType } from '#interfaces/media_type_interface'
import Media from '#models/media'
import MediaCategory from '#models/media_category'
import MediaType from '#models/media_type'
import { inject } from '@adonisjs/core'

@inject()
export default class MediaTypeService {
  public async addOneType(type: IMediaType) {
    const validSelectedCategory: MediaCategory | null = await MediaCategory.find(type.categoryId)
    if (!validSelectedCategory) {
      throw new Error('Aucune catégorie ne correspond')
    }

    const matchingTypes = await MediaType.query()
      .select('*')
      .from('media_types')
      .whereIn(['name', 'categoryId'], [[type.name, validSelectedCategory.id]])
    const isSelectedTypeAlreadyAdded = matchingTypes.length > 0
    if (isSelectedTypeAlreadyAdded) {
      throw new Error(`Ce type a déjà été ajouté pour la catégorie ${validSelectedCategory.name}`)
    }

    const newType = await MediaType.create(type)

    return newType
  }

  public async updateOneType(updatedType: IMediaType, typeId: number) {
    const validSelectedType: MediaType | null = await MediaType.find(typeId)
    if (!validSelectedType) {
      throw new Error('Aucun type trouvé')
    }
    const matchingTypes = await MediaType.query()
      .select('*')
      .from('media_types')
      .whereIn(['name', 'categoryId'], [[updatedType.name, validSelectedType.categoryId]])
    const isSelectedTypeAlreadyAdded = matchingTypes.length > 0
    if (isSelectedTypeAlreadyAdded) {
      throw new Error('Ce type a déjà été ajouté pour cette catégorie')
    }

    await validSelectedType.merge(updatedType).save()

    return updatedType
  }

  public async deleteOneType(typeId: number) {
    const validSelectedType: MediaType | null = await MediaType.find(typeId)
    if (!validSelectedType) {
      throw new Error("Le type selectionné n'existe pas")
    }

    const mediaUsingSelectedType = await Media.findBy('typeId', validSelectedType.id)
    if (mediaUsingSelectedType) {
      throw new Error('Impossible de supprimer car un ou plusieurs media utilisent ce type')
    }

    await validSelectedType.delete()
  }
}
