import { MediaPresenter } from '#classes/MediaPresenter'
import BookPublisher from '#models/book_publisher'
import GamePlatform from '#models/game_platform'
import MediaStatus from '#models/media_status'
import MediaCategoryService from '#services/media_category_service'
import MediaService from '#services/media_service'
import { mediaFiltersValidator, mediaValidator } from '#validators/media_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

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

  public async showManage({ params, inertia }: HttpContext) {
    let media
    if (params.mediaId) {
      media = await this.mediaService.getOne(params.mediaId)
    }

    const statuses = await MediaStatus.query().orderBy('name', 'desc')
    const gamePlatforms = await GamePlatform.query().orderBy('name')
    const bookPublishers = await BookPublisher.query().orderBy('name')
    const categoriesWithRelations = await this.mediaCategoryService.getCategoriesWithRelations()

    const categoryAssociations = categoriesWithRelations.reduce((acc, category) => {
      acc[category.id] = {
        types: category.types.map((t) => ({ value: t.id, text: t.name })),
        genres: category.genres.map((g) => ({ value: g.id, text: g.name })),
      }
      return acc
    }, {} as CategoryAssociations)

    return inertia.render('admin/ManageMedia', {
      statuses,
      categories: categoriesWithRelations,
      categoryAssociations,
      gamePlatforms,
      bookPublishers,
      media,
    })
  }

  async store({ request, session, response }: HttpContext) {
    const data = await request.validateUsing(mediaValidator)
    await this.mediaService.manageOne(data)

    session.flash('success', `${data.name} ajouté avec succès`)
    return response.redirect().toRoute('dashboard.home')
  }

  async update({ params, request, session, response }: HttpContext) {
    const data = await request.validateUsing(mediaValidator)
    await this.mediaService.manageOne(data, params.mediaId)

    session.flash('success', `${data.name} modifié avec succès`)
    return response.redirect().toRoute('dashboard.home')
  }

  async destroy({ params, session, response }: HttpContext) {
    const mediaDeleted = await this.mediaService.delete(params.mediaId)

    session.flash('success', `${mediaDeleted} supprimé avec succès`)
    return response.redirect().toRoute('dashboard.home')
  }

  public async showOne({ params, inertia }: HttpContext) {
    const media = await this.mediaService.getOne(params.mediaId)
    const presentedMedia = MediaPresenter.present(media)

    return inertia.render('media/MediaProfile', {
      media: presentedMedia,
    })
  }

  public async showByCategory({ params, request, inertia }: HttpContext) {
    const page = request.input('page', 1)
    const filters = await request.validateUsing(mediaFiltersValidator)
    const categoryName = params.categoryName

    const mediaList = await MediaService.getFiltered(filters, page, 15, categoryName)
    const mediaSortOptions = MediaService.sortOptions
    const mediaStatusesList = await MediaStatus.query().orderBy('id')
    const mediaTypesList = await this.mediaCategoryService.getCategoryTypes(categoryName)
    const mediaGenresList = await this.mediaCategoryService.getCategoryGenres(categoryName)
    const gamePlatformsList = await GamePlatform.query().orderBy('name')
    const bookPublishersList = await BookPublisher.query().orderBy('name')

    // needed for pagination
    mediaList.baseUrl(`/categories/${categoryName}`)

    const paginatedMediaList = MediaPresenter.presentPaginated(mediaList)

    return inertia.render('media/MediaList', {
      mediaList: paginatedMediaList,
      mediaCategory: categoryName,
      mediaSortOptions,
      mediaStatusesList,
      mediaTypesList,
      mediaGenresList,
      gamePlatformsList,
      bookPublishersList,
    })
  }

  public async showCategories({ inertia }: HttpContext) {
    const mediaCategories = ['game', 'movie', 'series', 'anime', 'book']
    const mediaLists = await Promise.all(
      mediaCategories.map((category) => this.mediaService.getLastAdded(category, 5))
    )

    const presentedMediaLists = mediaLists.map((mediaList) => MediaPresenter.presentMany(mediaList))

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
