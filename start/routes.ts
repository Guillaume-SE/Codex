import router from '@adonisjs/core/services/router'
// import { middleware } from './kernel.js'
const UsersController = () => import('#controllers/users_controller')
const MediaController = () => import('#controllers/media_controller')
const CoversController = () => import('#controllers/covers_controller')
const ReviewsController = () => import('#controllers/reviews_controller')
const GenresController = () => import('#controllers/genres_controller')
const MediaTypesController = () => import('#controllers/media_types_controller')
const MediaCategoriesController = () => import('#controllers/media_categories_controller')
const GamePlatformsController = () => import('#controllers/game_platforms_controller')
const HomeController = () => import('#controllers/home_controller')
const StorageController = () => import('#controllers/storage_controller')
const DashboardController = () => import('#controllers/dashboard_controller')

router.where('mediaId', router.matchers.number())
router.where('platformId', router.matchers.number())
router.where('categoryId', router.matchers.number())
router.where('typeId', router.matchers.number())
router.where('genreId', router.matchers.number())

router.group(() => {
  router.get('/', [HomeController, 'showHome']).as('home')
  router.get('/storage/*', [StorageController, 'show'])
  router.get('/users/:id', [UsersController, 'show']).as('users.show')

  // Public media browsing routes
  router.get('/categories', [MediaController, 'showCategories']).as('categories.index')
  router
    .group(() => {
      router
        .get('/categories/:categoryName', [MediaController, 'showByCategory'])
        .as('categories.show')
      router
        .get('/categories/:categoryName/:mediaId', [MediaController, 'showOne'])
        .as('media.show')
    })
    .where('categoryName', { match: /^(game|book|anime|series|movie)$/ })
})

// ADMIN
router
  .group(() => {
    router.get('/dashboard', [DashboardController, 'showDashboard']).as('dashboard.home')

    // --- Media CRUD ---
    router.get('/media/create', [MediaController, 'showManage']).as('media.create')
    router.get('/media/:mediaId/edit', [MediaController, 'showManage']).as('media.edit')

    router.post('/media', [MediaController, 'store']).as('media.store')
    router.put('/media/:mediaId', [MediaController, 'update']).as('media.update')
    router.delete('/media/:mediaId', [MediaController, 'destroy']).as('media.destroy')

    // Reviews
    router.get('/media/:mediaId/review', [ReviewsController, 'showManage']).as('reviews.manage')
    router.post('/media/:mediaId/review', [ReviewsController, 'store']).as('reviews.store')
    router.put('/media/:mediaId/review', [ReviewsController, 'update']).as('reviews.update')

    // Covers
    router.get('/media/:mediaId/cover', [CoversController, 'showManage']).as('covers.manage')
    router.post('/media/:mediaId/cover', [CoversController, 'manageOne']).as('covers.store')
    router.delete('/media/:mediaId/cover', [CoversController, 'deleteOne']).as('covers.destroy')

    // --- Other Management Pages (Genres, Types, Platforms) ---
    router.get('/genres/manage', [GenresController, 'showManage']).as('genres.index')
    router.post('/genres', [GenresController, 'store']).as('genres.store')
    router.put('/genres/:genreId', [GenresController, 'update']).as('genres.update')
    router.delete('/genres/:genreId', [GenresController, 'destroy']).as('genres.destroy')

    router.get('/types/manage', [MediaTypesController, 'showManage']).as('types.index')
    router.post('/types', [MediaTypesController, 'store']).as('types.store')
    router.put('/types/:typeId', [MediaTypesController, 'update']).as('types.update')
    router.put('/types/replace/:typeId', [MediaTypesController, 'replaceOne']).as('types.replace')
    router.delete('/types/:typeId', [MediaTypesController, 'destroy']).as('types.destroy')

    router.get('/platforms/manage', [GamePlatformsController, 'showManage']).as('platforms.index')
    router.post('/platforms', [GamePlatformsController, 'store']).as('platforms.store')
    router.put('/platforms/:platformId', [GamePlatformsController, 'update']).as('platforms.update')
    router
      .delete('/platforms/:platformId', [GamePlatformsController, 'destroy'])
      .as('platforms.destroy')

    router
      .get('/categories/manage', [MediaCategoriesController, 'showManage'])
      .as('categories.manage')
    router
      .post('/categories/:categoryId/associate', [MediaCategoriesController, 'associate'])
      .as('categories.associate')
  })
  .prefix('/admin')
// .use(middleware.auth())
