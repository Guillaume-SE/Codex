import { MediaPresenterFactory } from '#classes/MediaPresenter'
import GamePlatform from '#models/game_platform'
import MediaCategory from '#models/media_category'
import MediaStatus from '#models/media_status'
import Tag from '#models/tag'
import ContributorService from '#services/contributor_service'
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
import db from '@adonisjs/lucid/services/db'

@inject()
export default class MediaController {
  constructor(
    protected mediaService: MediaService,
    protected mediaCategoryService: MediaCategoryService,
    protected contributorService: ContributorService
  ) {}

  async showCreate({ inertia }: HttpContext) {
    type FormattedOptions = { text: string; value: string | number }
    type CategoryRelatedTypes = Record<string, { text: string; value: string | number }[]>
    type CategoryRelatedGenres = Record<string, { text: string; value: string | number }[]>

    // easier to manipulate lists in the SelectComp components
    const formatOptions = <T extends Record<string, any>>(
      items: T[],
      textKey: keyof T,
      valueKey: keyof T
    ): FormattedOptions[] => items.map((item) => ({ text: item[textKey], value: item[valueKey] }))

    const statuses = await MediaStatus.query().orderBy('name', 'desc')
    const categories = await MediaCategory.query().orderBy('name')
    const tags = await Tag.query().orderBy('name')
    const gamePlatforms = await GamePlatform.query().orderBy('name')

    const categoryTypes = await db
      .from('category_types')
      .join('media_types', 'category_types.type_id', 'media_types.id')
      .select('category_types.category_id', 'media_types.id', 'media_types.name')
      .orderBy('name')

    const categoryGenres = await db
      .from('category_genres')
      .join('genres', 'category_genres.genre_id', 'genres.id')
      .select('category_genres.category_id', 'genres.id', 'genres.name')
      .orderBy('name')

    // needed to only show types for a chosen category in the form
    const categoryRelatedTypes = categories.reduce((acc: CategoryRelatedTypes, category) => {
      const types = categoryTypes
        .filter((ct) => ct.category_id === category.id)
        .map((ct) => ({
          text: ct.name,
          value: ct.id,
        }))
      acc[category.id] = types
      return acc
    }, {})

    // needed to only show genres for a chosen category in the form
    const categoryRelatedGenres = categories.reduce((acc: CategoryRelatedGenres, category) => {
      const genres = categoryGenres
        .filter((ct) => ct.category_id === category.id)
        .map((ct) => ({
          text: ct.name,
          value: ct.id,
        }))
      acc[category.id] = genres
      return acc
    }, {})

    return inertia.render('admin/CreateMedia', {
      statuses,
      categories,
      categoryRelatedTypes,
      categoryRelatedGenres,
      tags,
      gamePlatforms,
    })
  }

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
      const presentedMedia = MediaPresenterFactory.presentMedia(media)

      const tagRelatedList = await this.mediaService.getTagRelated(
        presentedMedia.category,
        presentedMedia.id,
        presentedMedia.tag
      )

      const presentedTagRelatedList = MediaPresenterFactory.presentMediaList(tagRelatedList)

      return inertia.render('media/MediaProfile', {
        media: presentedMedia,
        tagRelatedList: presentedTagRelatedList,
      })
    } catch (error) {
      return response.redirect('/')
    }
  }

  public async showByCategory({ inertia, request, response }: HttpContext) {
    interface ICategoryConfig {
      title: string
      categoryFr: string
    }
    const categoryConfig: Record<MediaCategories, ICategoryConfig> = {
      game: { title: 'Liste des jeux', categoryFr: 'jeu' },
      movie: { title: 'Liste des films', categoryFr: 'film' },
      series: { title: 'Liste des séries', categoryFr: 'série' },
      book: { title: 'Liste des livres', categoryFr: 'livre' },
      anime: { title: 'Liste des anime', categoryFr: 'anime' },
    }

    try {
      const page = request.input('page')
      const filters = await request.validateUsing(showByCategoryMediaValidator)
      const category = filters.params.categoryName

      const config = categoryConfig[category]
      const mediaList = await MediaService.getFiltered(category, filters, page)
      const mediaSortOptions = MediaService.sortOptions
      const mediaStatusesList = await MediaStatus.all()
      const mediaTypesList = await this.mediaCategoryService.getCategoryTypes(category)
      const mediaGenresList = await this.mediaCategoryService.getCategoryGenres(category)
      const gamePlatformsList = await GamePlatform.all()

      mediaList.baseUrl(`/category/${category}`)

      const paginatedMediaList = MediaPresenterFactory.presentPaginatedMediaList(mediaList)

      return inertia.render('media/MediaList', {
        mediaList: paginatedMediaList,
        title: config.title,
        mediaCategory: category,
        mediaCategoryFr: config.categoryFr,
        mediaSortOptions,
        mediaStatusesList,
        mediaTypesList,
        mediaGenresList,
        gamePlatformsList,
      })
    } catch (error) {
      return response.redirect('/')
    }
  }

  public async showCategories({ inertia, response }: HttpContext) {
    try {
      const mediaCategories = ['game', 'movie', 'series', 'anime', 'book']
      const mediaLists = await Promise.all(
        mediaCategories.map((category) => this.mediaService.getLastAdded(category, 5))
      )

      const presentedMediaLists = mediaLists.map((mediaList) =>
        MediaPresenterFactory.presentMediaList(mediaList)
      )

      const [
        presentedGamesList,
        presentedMoviesList,
        presentedSeriesList,
        presentedAnimeList,
        presentedBooksList,
      ] = presentedMediaLists

      const categoriesOverview = [
        { label: 'Jeux', category: 'game', lastAddedList: presentedGamesList },
        { label: 'Films', category: 'movie', lastAddedList: presentedMoviesList },
        { label: 'Séries', category: 'series', lastAddedList: presentedSeriesList },
        { label: 'Anime', category: 'anime', lastAddedList: presentedAnimeList },
        { label: 'Livres', category: 'book', lastAddedList: presentedBooksList },
      ]

      return inertia.render('media/MediaCategories', {
        categoriesOverview,
      })
    } catch (error) {
      return response.redirect('/')
    }
  }
}
