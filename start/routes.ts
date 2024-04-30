import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const UsersController = () => import('#controllers/users_controller')
const MediaController = () => import('#controllers/media_controller')
const MoviesController = () => import('#controllers/movies_controller')
const GamesController = () => import('#controllers/games_controller')
const SeasonsController = () => import('#controllers/seasons_controller')
const BooksController = () => import('#controllers/books_controller')
const CoversController = () => import('#controllers/covers_controller')
const ReviewsController = () => import('#controllers/reviews_controller')

router.on('/').render('pages/home')

/**
 * users
 */
router.get('/users/:id', [UsersController, 'show']).as('users.show')

/**
 * medias
 */
router.get('/media', [MediaController, 'getAllMedia']).as('media.show')
router.get('/media/:id', [MediaController, 'getOneMediaById']).as('media.show.one')
//ADMIN
router.delete('/media/:id', [MediaController, 'deleteOneMedia']).as('media.delete')
/**
 * reviews
 */
//ADMIN
router.put('media/:mediaId/reviews', [ReviewsController, 'updateOneReview']).as('reviews.update')

/**
 * movies
 */
router.get('/movies', [MoviesController, 'getAllMovies']).as('movies.show')
router.get('/movies/:mediaId', [MoviesController, 'getOneMovieByMediaId']).as('movies.show.one')
//ADMIN
router.post('/movies', [MoviesController, 'addOneMovie']).as('movies.add')
router.put('/movies/:mediaId', [MoviesController, 'updateOneMovie']).as('movies.update')

/**
 * games
 */
router.get('/games', [GamesController, 'getAllGames']).as('games.show')
router.get('/games/:mediaId', [GamesController, 'getOneGameByMediaId']).as('games.show.one')
//ADMIN
router.post('/games', [GamesController, 'addOneGame']).as('games.add')
router.put('/games/:mediaId', [GamesController, 'updateOneGame']).as('games.update')

/**
 * seasons
 */
router.get('/seasons', [SeasonsController, 'getAllSeasons']).as('seasons.show')
router.get('/seasons/:mediaId', [SeasonsController, 'getOneSeasonByMediaId']).as('seasons.show.one')
//ADMIN
router.post('/seasons', [SeasonsController, 'addOneSeason']).as('seasons.add')
router.put('/seasons/:mediaId', [SeasonsController, 'updateOneSeason']).as('seasons.update')

/**
 * books
 */
router.get('/books', [BooksController, 'getAllBooks']).as('books.show')
router.get('/books/:mediaId', [BooksController, 'getOneBookByMediaId']).as('books.show.one')
//ADMIN
router.post('/books', [BooksController, 'addOneBook']).as('books.add')
router.put('/books/:mediaId', [BooksController, 'updateOneBook']).as('books.update')

/**
 * covers
 */
router.get('/covers', [CoversController, 'getAllCovers'])
//ADMIN
router.put('/covers/:mediaId', [CoversController, 'updateOneCover'])
router.delete('/covers/:mediaId', [CoversController, 'deleteOneCover'])
