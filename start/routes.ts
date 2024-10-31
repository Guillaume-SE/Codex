import router from '@adonisjs/core/services/router'
// import { middleware } from './kernel.js'
const UsersController = () => import('#controllers/users_controller')
const MediaController = () => import('#controllers/media_controller')
const CoversController = () => import('#controllers/covers_controller')
const ReviewsController = () => import('#controllers/reviews_controller')
const GenresController = () => import('#controllers/genres_controller')
const MediaTypesController = () => import('#controllers/media_types_controller')
const GamePlatformsController = () => import('#controllers/game_platforms_controller')
const ContributorsRolesController = () => import('#controllers/contributors_roles_controller')
const ContributorsController = () => import('#controllers/contributors_controller')
const HomeController = () => import('#controllers/home_controller')
const StorageController = () => import('#controllers/storage_controller')

router.get('/', [HomeController, 'showHome']).as('home')

router.get('/storage/*', [StorageController, 'show'])
/**
 * users
 */
router.get('/users/:id', [UsersController, 'show'])
/**
 * medias
 */
router.get('/media', [MediaController, 'show']).as('media.show')
router.get('/media/:categoryName', [MediaController, 'showByCategory'])
router.get('/media/:categoryName/:mediaId', [MediaController, 'showOne'])
//ADMIN
router.post('/media', [MediaController, 'addOne'])
router.put('/media/:mediaId', [MediaController, 'updateOne'])
router.delete('/media/:mediaId', [MediaController, 'deleteOne'])
/**
 * reviews
 */
router.post('/media/:mediaId/review', [ReviewsController, 'manageReview'])
router.put('/media/:mediaId/review', [ReviewsController, 'manageReview'])
/**
 * covers
 */
router.get('/media/covers', [CoversController, 'show'])
router.post('/media/:mediaId/cover', [CoversController, 'manageOne'])
router.put('/media/:mediaId/cover', [CoversController, 'manageOne'])
router.delete('/media/:mediaId/cover', [CoversController, 'deleteOne'])
/**
 * genres
 */
router.post('/genre', [GenresController, 'addOne'])
router.put('/genre/:genreId', [GenresController, 'updateOne'])
router.delete('/genre/:genreId', [GenresController, 'deleteOne'])
/**
 * types
 */
router.post('/type', [MediaTypesController, 'addOne'])
router.put('/type/:typeId', [MediaTypesController, 'updateOne'])
/**
 * game platforms
 */
router.post('/platform', [GamePlatformsController, 'addOne'])
router.put('/platform/:platformId', [GamePlatformsController, 'updateOne'])
router.delete('/platform/:platformId', [GamePlatformsController, 'deleteOne'])
/**
 * contributors roles
 */
router.post('/contributor-role', [ContributorsRolesController, 'addOne'])
router.put('/contributor-role/:roleId', [ContributorsRolesController, 'updateOne'])
router.delete('/contributor-role/:roleId', [ContributorsRolesController, 'deleteOne'])
/**
 * contributors
 */
router.post('/contributor', [ContributorsController, 'addOne'])
router.put('/contributor/:contributorId', [ContributorsController, 'updateOne'])
router.delete('/contributor/:contributorId', [ContributorsController, 'deleteOne'])
