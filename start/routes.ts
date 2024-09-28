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
const MediaStatusesController = () => import('#controllers/media_statuses_controller')
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
router.post('/media', [MediaController, 'addOneMedia']).as('media.add')
router.put('/media/:mediaId', [MediaController, 'updateOneMedia']).as('media.update')
router.delete('/media/:mediaId', [MediaController, 'deleteOneMedia']).as('media.delete')
/**
 * reviews
 */
router.post('/media/:mediaId/avis', [ReviewsController, 'manageReview']).as('reviews.add')
router.put('/media/:mediaId/avis', [ReviewsController, 'manageReview']).as('reviews.update')
/**
 * movies
 */
router.get('/films', [MoviesController, 'getAllMovies']).as('movies.show')
/**
 * games
 */
router.get('/jeuxvideo', [GamesController, 'show']).as('games.show')
/**
 * series
 */
router.get('/series', [SeriesController, 'getAllSeries']).as('series.show')
/**
 * books
 */
router.get('/livres', [BooksController, 'getAllBooks']).as('books.show')
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
router.post('/genre', [GenresController, 'addOneGenre']).as('genres.add')
router.put('/genre/:genreId', [GenresController, 'updateOneGenre']).as('genres.update')
router.delete('/genre/:genreId', [GenresController, 'deleteOneGenre']).as('genres.delete')
/**
 * media statuses
 */
router.post('/statut', [MediaStatusesController, 'addOneStatus']).as('status.add')
router.put('/statut/:statusId', [MediaStatusesController, 'updateOneStatus']).as('status.update')
router.delete('/statut/:statusId', [MediaStatusesController, 'deleteOneStatus']).as('status.delete')
/**
 * types
 */
router.post('/type', [MediaTypesController, 'addOneType']).as('types.add')
router.put('/type/:typeId', [MediaTypesController, 'updateOneType']).as('types.update')
router.delete('/type/:typeId', [MediaTypesController, 'deleteOneType']).as('types.delete')
/**
 * game platforms
 */
router.post('/plateforme', [GamePlatformsController, 'addOnePlatform']).as('platforms.add')
router
  .put('/plateforme/:platformId', [GamePlatformsController, 'updateOnePlatform'])
  .as('platforms.update')
router
  .delete('/plateforme/:platformId', [GamePlatformsController, 'deleteOnePlatform'])
  .as('platforms.delete')
/**
 * contributors roles
 */
router
  .post('/role', [ContributorsRolesController, 'addOneContributorRole'])
  .as('contributor-role.add')
router
  .put('/role/:contributorRoleId', [ContributorsRolesController, 'updateOneContributorRole'])
  .as('contributor-role.update')
router
  .delete('/role/:contributorRoleId', [ContributorsRolesController, 'deleteOneContributorRole'])
  .as('contributor-role.delete')
/**
 * contributors
 */
router.post('/contributeur', [ContributorsController, 'addOneContributor']).as('contributor.add')
router
  .put('/contributeur/:contributorId', [ContributorsController, 'updateOneContributor'])
  .as('contributor.update')
router
  .delete('/contributeur/:contributorId', [ContributorsController, 'deleteOneContributor'])
  .as('contributor.delete')
