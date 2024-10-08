import router from '@adonisjs/core/services/router'
// import { middleware } from './kernel.js'
const SeriesController = () => import('#controllers/series_controller')
const UsersController = () => import('#controllers/users_controller')
const MediaController = () => import('#controllers/media_controller')
const MoviesController = () => import('#controllers/movies_controller')
const GamesController = () => import('#controllers/games_controller')
const AnimeController = () => import('#controllers/anime_controller')
const BooksController = () => import('#controllers/books_controller')
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

router.get('/storage/*', [StorageController, 'show']).as('storage.show')
/**
 * users
 */
router.get('/users/:id', [UsersController, 'show']).as('users.show')
/**
 * medias
 */
router.get('/media', [MediaController, 'show']).as('media.show')
router.get('/media/:mediaId', [MediaController, 'showOne']).as('media.show.one')
//ADMIN
router.post('/media', [MediaController, 'addOne']).as('media.add')
router.put('/media/:mediaId', [MediaController, 'updateOne']).as('media.update')
router.delete('/media/:mediaId', [MediaController, 'deleteOne']).as('media.delete')
/**
 * reviews
 */
router.post('/media/:mediaId/review', [ReviewsController, 'manageReview']).as('reviews.add')
router.put('/media/:mediaId/review', [ReviewsController, 'manageReview']).as('reviews.update')
/**
 * games
 */
router.get('/games', [GamesController, 'show']).as('games.show')
/**
 * movies
 */
router.get('/movies', [MoviesController, 'getAllMovies']).as('movies.show')
/**
 * series
 */
router.get('/series', [SeriesController, 'getAllSeries']).as('series.show')
/**
 * books
 */
router.get('/books', [BooksController, 'getAllBooks']).as('books.show')
/**
 * anime
 */
router.get('/anime', [AnimeController, 'getAllAnime']).as('anime.show')
/**
 * covers
 */
router.get('/covers', [CoversController, 'show']).as('covers.show')
router.post('/media/:mediaId/cover', [CoversController, 'manageOne']).as('covers.add')
router.put('/media/:mediaId/cover', [CoversController, 'manageOne']).as('covers.update')
router.delete('/media/:mediaId/cover', [CoversController, 'deleteOne']).as('covers.delete')
/**
 * genres
 */
router.post('/genre', [GenresController, 'addOne']).as('genres.add')
router.put('/genre/:genreId', [GenresController, 'updateOne']).as('genres.update')
router.delete('/genre/:genreId', [GenresController, 'deleteOne']).as('genres.delete')
/**
 * types
 */
router.post('/type', [MediaTypesController, 'addOne']).as('types.add')
router.put('/type/:typeId', [MediaTypesController, 'updateOne']).as('types.update')
/**
 * game platforms
 */
router.post('/platform', [GamePlatformsController, 'addOne']).as('platforms.add')
router.put('/platform/:platformId', [GamePlatformsController, 'updateOne']).as('platforms.update')
router
  .delete('/platform/:platformId', [GamePlatformsController, 'deleteOne'])
  .as('platforms.delete')
/**
 * contributors roles
 */
router
  .post('/contributor-role', [ContributorsRolesController, 'addOne'])
  .as('contributors-roles.add')
router
  .put('/contributor-role/:roleId', [ContributorsRolesController, 'updateOne'])
  .as('contributors-roles.update')
router
  .delete('/contributor-role/:roleId', [ContributorsRolesController, 'deleteOne'])
  .as('contributors-roles.delete')
/**
 * contributors
 */
router.post('/contributor', [ContributorsController, 'addOneContributor']).as('contributors.add')
router
  .put('/contributor/:contributorId', [ContributorsController, 'updateOneContributor'])
  .as('contributors.update')
router
  .delete('/contributor/:contributorId', [ContributorsController, 'deleteOneContributor'])
  .as('contributors.delete')
