import { IMediaCategory } from '#interfaces/media_category_interface'
import MediaCategory from '#models/media_category'
import { inject } from '@adonisjs/core'

@inject()
export default class MediaCategoryService {
  public async addOneCategory(category: IMediaCategory) {
    const existingCategory = await MediaCategory.findBy('name', category.name)
    if (existingCategory) {
      throw new Error('Cette catégorie existe déjà')
    }

    const newCategory = await MediaCategory.create(category)

    return newCategory
  }

  public async updateOneCategory(updatedCategory: IMediaCategory, categoryId: number) {
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
}
