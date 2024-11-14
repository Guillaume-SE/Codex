import MediaStatus from '#models/media_status'
import MediaCategoryService from '#services/media_category_service'
import MediaService from '#services/media_service'
import type { MediaCategories } from '#types/MediaCategories'
import {
  createMediaValidator,
  deleteMediaValidator,
  showByCategoryMediaValidator,
  showOneMediaValidator,
  updateMediaValidator,
} from '#validators/media_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MediaController {
  constructor(
    protected mediaService: MediaService,
    protected mediaCategoryService: MediaCategoryService
  ) {}

  async addOne({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createMediaValidator)
      const newMedia = await this.mediaService.store(data)
      return response.status(201).json(newMedia)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  async updateOne({ params, response, request }: HttpContext) {
    const mediaId = params.mediaId
    try {
      const { params, ...data } = await request.validateUsing(updateMediaValidator)
      const media = await this.mediaService.update(data, mediaId)

      return response.status(201).json(media)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  async deleteOne({ request, params, response }: HttpContext) {
    const mediaId = params.mediaId

    try {
      await request.validateUsing(deleteMediaValidator)

      await this.mediaService.delete(mediaId)

      return response.status(200)
    } catch (error) {
      return response.status(404).json({ error, customError: error.message })
    }
  }

  public async showOne({ inertia, request, params, response }: HttpContext) {
    const mediaId = params.mediaId

    try {
      await request.validateUsing(showOneMediaValidator)
      const media = await this.mediaService.getOne(mediaId)
      const tagRelatedList = await this.mediaService.getTagRelated(
        media.category,
        media.id,
        media.tag
      )

      return inertia.render('media/MediaProfile', { media, tagRelatedList })
    } catch (error) {
      return response.status(404).json({ error, customError: error.message })
    }
  }

  public async showByCategory({ inertia, request, response }: HttpContext) {
    const categoryConfig: Record<MediaCategories, { title: string; categoryFr: string }> = {
      game: { title: 'Liste des jeux', categoryFr: 'jeu' },
      movie: { title: 'Liste des films', categoryFr: 'film' },
      series: { title: 'Liste des séries', categoryFr: 'série' },
      book: { title: 'Liste des livres', categoryFr: 'livre' },
      anime: { title: 'Liste des anime', categoryFr: 'anime' },
    }

    try {
      const filters = await request.validateUsing(showByCategoryMediaValidator)
      const category = filters.params.categoryName

      const config = categoryConfig[category]
      const mediaList = await this.mediaService.getByCategory(category, filters)
      const mediaStatusesList = await MediaStatus.all()
      const mediaTypesList = await this.mediaCategoryService.getCategoryTypes(category)
      const mediaGenresList = await this.mediaCategoryService.getCategoryGenres(category)

      return inertia.render('media/MediaList', {
        mediaList,
        title: config.title,
        mediaCategory: category,
        mediaCategoryFr: config.categoryFr,
        mediaStatusesList,
        mediaTypesList,
        mediaGenresList,
      })
    } catch (error) {
      return response.redirect('/')
    }
  }
}
