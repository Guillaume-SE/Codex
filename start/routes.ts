import router from '@adonisjs/core/services/router'
// import { middleware } from './kernel.js'
const UsersController = () => import('#controllers/users_controller')
const MediaController = () => import('#controllers/media_controller')
const CoversController = () => import('#controllers/covers_controller')
const ReviewsController = () => import('#controllers/reviews_controller')
const GenresController = () => import('#controllers/genres_controller')
const MediaTypesController = () => import('#controllers/media_types_controller')
const TagsController = () => import('#controllers/tags_controller')
const GamePlatformsController = () => import('#controllers/game_platforms_controller')
const HomeController = () => import('#controllers/home_controller')
const StorageController = () => import('#controllers/storage_controller')
const DashboardController = () => import('#controllers/dashboard_controller')

router.get('/', [HomeController, 'showHome']).as('home')

router.get('/storage/*', [StorageController, 'show'])

//* users
router.get('/users/:id', [UsersController, 'show'])

//* media
router.get('/categories', [MediaController, 'showCategories'])
router.get('/category/:categoryName', [MediaController, 'showByCategory'])
router.get('/category/:categoryName/:mediaId', [MediaController, 'showOne'])
//ADMIN
router.get('/media/manage/:mediaId?', [MediaController, 'showManage'])
router.post('/media', [MediaController, 'manageOne'])
router.put('/media/:mediaId', [MediaController, 'manageOne'])
router.delete('/media/:mediaId', [MediaController, 'deleteOne'])

//* reviews
router.get('/media/:mediaId/review', [ReviewsController, 'showManage'])
router.post('/media/:mediaId/review', [ReviewsController, 'manageReview'])
router.put('/media/:mediaId/review', [ReviewsController, 'manageReview'])

//* covers
router.get('/media/:mediaId/cover', [CoversController, 'showManage'])
router.post('/media/:mediaId/cover', [CoversController, 'manageOne'])
router.delete('/media/:mediaId/cover', [CoversController, 'deleteOne'])

//* genres
router.post('/genre', [GenresController, 'addOne'])
router.put('/genre/:genreId', [GenresController, 'updateOne'])
router.delete('/genre/:genreId', [GenresController, 'deleteOne'])

//* types
router.post('/type', [MediaTypesController, 'addOne'])
router.put('/type/:typeId', [MediaTypesController, 'updateOne'])

//* tags
router.post('/tag', [TagsController, 'addOne'])
router.put('/tag/:tagId', [TagsController, 'updateOne'])
router.delete('/tag/:tagId', [TagsController, 'deleteOne'])

//* game platforms
router.post('/platform', [GamePlatformsController, 'addOne'])
router.put('/platform/:platformId', [GamePlatformsController, 'updateOne'])
router.delete('/platform/:platformId', [GamePlatformsController, 'deleteOne'])

//* dashboard
router.get('/dashboard', [DashboardController, 'showDashboard']).as('dashboard.home')
