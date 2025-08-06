import { MediaPresenterFactory } from '#classes/MediaPresenter'
import GamePlatform from '#models/game_platform'
import MediaCategory from '#models/media_category'
import MediaStatus from '#models/media_status'
import MediaCategoryService from '#services/media_category_service'
import MediaService from '#services/media_service'
import type { MediaCategories } from '#types/MediaCategories'
import {
  createMediaValidator,
  mediaFiltersValidator,
  updateMediaValidator,
} from '#validators/media_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

interface ICategoriesType {
  category_id: number
  type_id: number
  name: string
}
interface ICategoriesGenre {
  category_id: number
  genre_id: number
  name: string
}
type Item = { text: string; value: number }
type CategoryAssociations = Record<
  string,
  {
    types: Item[]
    genres: Item[]
  }
>

@inject()
export default class MediaController {
  constructor(
    protected mediaService: MediaService,
    protected mediaCategoryService: MediaCategoryService
  ) {}

  async showManage({ params, inertia }: HttpContext) {
    let media
    if (params.mediaId) {
      media = await this.mediaService.getOne(params.mediaId)
    }

    const statuses = await MediaStatus.query().orderBy('name', 'desc')
    const categories = await MediaCategory.query().orderBy('name')
    const gamePlatforms = await GamePlatform.query().orderBy('name')
    const categoriesTypes = await this.mediaCategoryService.getCategoriesTypes()
    const categoriesGenres = await this.mediaCategoryService.getCategoriesGenres()

    // needed to only show related items to each categories in the form
    const buildCategoryAssociations = (
      categoriesTypes: ICategoriesType[],
      categoriesGenres: ICategoriesGenre[]
    ): CategoryAssociations => {
      const result: CategoryAssociations = {}

      const ensure = (id: string | number) => {
        const key = String(id)
        if (!result[key]) result[key] = { types: [], genres: [] }
        return result[key]
      }

      for (const { category_id, type_id, name } of categoriesTypes) {
        ensure(category_id).types.push({ value: type_id, text: name })
      }

      for (const { category_id, genre_id, name } of categoriesGenres) {
        ensure(category_id).genres.push({ value: genre_id, text: name })
      }

      return result
    }

    const categoryAssociations = buildCategoryAssociations(categoriesTypes, categoriesGenres)

    return inertia.render('admin/ManageMedia', {
      statuses,
      categories,
      categoryAssociations,
      gamePlatforms,
      media,
    })
  }

  async manageOne({ params, response, request }: HttpContext) {
    // for update
    if (params.mediaId) {
      const data = await request.validateUsing(updateMediaValidator)
      await this.mediaService.manageOne(data, params.mediaId)

      return response.redirect().toRoute('dashboard.home')
    }
    // for create
    const data = await request.validateUsing(createMediaValidator)
    await this.mediaService.manageOne(data)

    return response.redirect().toRoute('dashboard.home')
  }

  async deleteOne({ params, response }: HttpContext) {
    await this.mediaService.delete(params.mediaId)

    return response.redirect().toRoute('dashboard.home')
  }

  public async showOne({ params, inertia }: HttpContext) {
    const media = await this.mediaService.getOne(params.mediaId)
    const presentedMedia = MediaPresenterFactory.presentMedia(media)

    return inertia.render('media/MediaProfile', {
      media: presentedMedia,
    })
  }

  public async showByCategory({ params, request, inertia }: HttpContext) {
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

    const page = request.input('page')
    const filters = await request.validateUsing(mediaFiltersValidator)
    // to proc a 404 if the category doesn't exist
    const category = await MediaCategory.findByOrFail('name', params.categoryName)

    const config = categoryConfig[category.name]
    const mediaList = await MediaService.getFiltered(filters, page, 15, category.name)
    const mediaSortOptions = MediaService.sortOptions
    const mediaStatusesList = await MediaStatus.all()
    const mediaTypesList = await this.mediaCategoryService.getCategoryTypes(category.name)
    const mediaGenresList = await this.mediaCategoryService.getCategoryGenres(category.name)
    const gamePlatformsList = await GamePlatform.all()

    // needed for pagination
    mediaList.baseUrl(`/category/${category}`)

    const paginatedMediaList = MediaPresenterFactory.presentPaginatedMediaList(mediaList)

    return inertia.render('media/MediaList', {
      mediaList: paginatedMediaList,
      title: config.title,
      mediaCategory: category.name,
      mediaCategoryFr: config.categoryFr,
      mediaSortOptions,
      mediaStatusesList,
      mediaTypesList,
      mediaGenresList,
      gamePlatformsList,
    })
  }

  public async showCategories({ inertia }: HttpContext) {
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
      { label: 'Jeux', nameEng: 'game', lastAddedList: presentedGamesList },
      { label: 'Films', nameEng: 'movie', lastAddedList: presentedMoviesList },
      { label: 'Séries', nameEng: 'series', lastAddedList: presentedSeriesList },
      { label: 'Anime', nameEng: 'anime', lastAddedList: presentedAnimeList },
      { label: 'Livres', nameEng: 'book', lastAddedList: presentedBooksList },
    ]

    return inertia.render('media/MediaCategories', {
      categoriesOverview,
    })
  }
}
