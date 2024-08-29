import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
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
const MediaCategoriesController = () => import('#controllers/media_categories_controller')

router.on('/').render('pages/home')

/**
 * users
 */
router.get('/users/:id', [UsersController, 'show']).as('users.show')

/**
 * medias
 */
router.get('/media', [MediaController, 'getAllMedia']).as('media.show')
router.get('/media/:mediaId', [MediaController, 'getOneMediaById']).as('media.show.one')
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
router.get('/jeuxvideo', [GamesController, 'getAllGames']).as('games.show')

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
router.get('/covers', [CoversController, 'getAllCovers'])
router.post('media/:mediaId/cover', [CoversController, 'manageOneCover']).as('cover.add')
router.put('media/:mediaId/cover', [CoversController, 'manageOneCover']).as('cover.update')
router.delete('media/:mediaId/cover', [CoversController, 'deleteOneCover']).as('cover.delete')

/**
 * genres
 */
router.post('genre/', [GenresController, 'addOneGenre']).as('genre.add')
router.put('genre/:genreId', [GenresController, 'updateOneGenre']).as('genre.update')

/**
 * catégories
 */
router.post('categorie/', [MediaCategoriesController, 'addOneCategory']).as('category.add')
router
  .put('categorie/:categoryId', [MediaCategoriesController, 'updateOneCategory'])
  .as('category.update')
