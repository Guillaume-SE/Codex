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

router.get('/', [HomeController, 'showHome']).as('home')

router.get('/storage/*', [StorageController, 'show'])

//* users
router.get('/users/:id', [UsersController, 'show'])

//* media
router.get('/categories', [MediaController, 'showCategories'])
router.get('/categories/:categoryName', [MediaController, 'showByCategory'])
router.get('/categories/:categoryName/:mediaId', [MediaController, 'showOne'])
//ADMIN
router.get('/media/manage/:mediaId?', [MediaController, 'showManage'])
router.post('/media', [MediaController, 'manageOne'])
router.put('/media/:mediaId', [MediaController, 'manageOne'])
router.delete('/media/:mediaId', [MediaController, 'deleteOne'])

//* reviews
router.get('/media/:mediaId/review', [ReviewsController, 'showManage'])
router.post('/media/:mediaId/review', [ReviewsController, 'manageOne'])

//* covers
router.get('/media/:mediaId/cover', [CoversController, 'showManage'])
router.post('/media/:mediaId/cover', [CoversController, 'manageOne'])
router.delete('/media/:mediaId/cover', [CoversController, 'deleteOne'])

//* categories
router.get('/category/manage', [MediaCategoriesController, 'showManage']).as('category.manage')
router.post('/category/:categoryId/associate', [MediaCategoriesController, 'manageAssociation'])

//* genres
router.get('/genre/manage', [GenresController, 'showManage']).as('genre.manage')
router.post('/genre', [GenresController, 'storeOrUpdate'])
router.put('/genre/:genreId', [GenresController, 'storeOrUpdate'])
router.delete('/genre/:genreId', [GenresController, 'deleteOne'])

//* types
router.get('/type/manage', [MediaTypesController, 'showManage']).as('type.manage')
router.post('/type', [MediaTypesController, 'storeOrUpdate'])
router.put('/type/:typeId', [MediaTypesController, 'storeOrUpdate'])
router.put('/type/replace/:typeId', [MediaTypesController, 'replaceOne'])
router.delete('/type/:typeId', [MediaTypesController, 'deleteOne'])

//* game platforms
router.get('/platform/manage', [GamePlatformsController, 'showManage']).as('platform.manage')
router.post('/platform', [GamePlatformsController, 'storeOrUpdate'])
router.put('/platform/:platformId', [GamePlatformsController, 'storeOrUpdate'])
router.delete('/platform/:platformId', [GamePlatformsController, 'deleteOne'])

//* dashboard
router.get('/dashboard', [DashboardController, 'showDashboard']).as('dashboard.home')
