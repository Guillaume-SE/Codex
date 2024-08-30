import { IMediaCategory } from '#interfaces/media_category_interface'
import Media from '#models/media'
import MediaCategory from '#models/media_category'
import { inject } from '@adonisjs/core'

@inject()
export default class MediaCategoryService {
  public async addOne(category: IMediaCategory) {
    const existingSameCategory = await MediaCategory.findBy('name', category.name)
    if (existingSameCategory) {
      throw new Error('Cette catégorie existe déjà')
    }

    const newCategory = await MediaCategory.create(category)

    return newCategory
  }

  public async updateOne(updatedCategory: IMediaCategory, categoryId: number) {
    const validSelectedCategory = await MediaCategory.find(categoryId)
    if (!validSelectedCategory) {
      throw new Error("La catégorie n'existe pas")
    }

    const isUpdatedCategoryAlreadyExist = await MediaCategory.findBy('name', updatedCategory.name)
    if (isUpdatedCategoryAlreadyExist) {
      throw new Error('Cette catégorie existe déjà')
    }

    await validSelectedCategory.merge(updatedCategory).save()

    return updatedCategory
  }

  public async deleteOne(categoryId: number) {
    const validSelectedCategory = await MediaCategory.find(categoryId)
    if (!validSelectedCategory) {
      throw new Error("La catégorie selectionnée n'existe pas")
    }

    const mediaUsingSelectedCategory = await Media.findBy('categoryId', validSelectedCategory.id)
    if (mediaUsingSelectedCategory) {
      throw new Error('Impossible de supprimer car un ou plusieurs media utilisent cette catégorie')
    }

    await validSelectedCategory.delete()
  }
}
