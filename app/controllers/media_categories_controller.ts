import MediaCategoryService from '#services/media_category_service'
import { inject } from '@adonisjs/core'
// import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MediaCategoriesController {
  constructor(readonly mediaCategoryService: MediaCategoryService) {}
}
