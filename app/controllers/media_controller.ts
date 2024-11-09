import type { MediaCategories } from '#enums/MediaCategories'
import Genre from '#models/genre'
import MediaStatus from '#models/media_status'
import MediaType from '#models/media_type'
import MediaService from '#services/media_service'
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
  constructor(readonly mediaService: MediaService) {}

  async addOne({ request, response }: HttpContext) {
    try {
      const selectedCategoryId = request.body().categoryId
      // meta used to pass data to use them in queries in validation process
      const data = await request.validateUsing(createMediaValidator, {
        meta: { categoryId: selectedCategoryId },
      })
      const newMedia = await this.mediaService.store(data)
      return response.status(201).json(newMedia)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  async updateOne({ params, response, request }: HttpContext) {
    const mediaId = params.mediaId
    try {
      const selectedCategoryId = request.body().categoryId
      const { params, ...data } = await request.validateUsing(updateMediaValidator, {
        meta: { categoryId: selectedCategoryId },
      })
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
      const mediaList = await this.mediaService.getByCategory(category, filters)
      const config = categoryConfig[category]
      const mediaStatusesList = await MediaStatus.query().select('id', 'name').orderBy('id')
      const mediaTypesList = await MediaType.query()
        .select('id', 'name')
        .whereHas('category', (categoryQuery) => {
          categoryQuery.where('name', category)
        })
        .orderBy('name')
      const mediaGenresList = await Genre.query()
        .select('id', 'name')
        .whereHas('category', (categoryQuery) => {
          categoryQuery.where('name', category)
        })
        .orderBy('name')

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
