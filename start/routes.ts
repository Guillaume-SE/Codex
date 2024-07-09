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
//ADMIN
router.post('/media/:mediaId/critique', [ReviewsController, 'addOneReview']).as('reviews.add')
router.put('/media/:mediaId/critique', [ReviewsController, 'updateOneReview']).as('reviews.update')

/**
 * movies
 */
router.get('/films', [MoviesController, 'getAllMovies']).as('movies.show')
router.get('/film/:mediaId', [MoviesController, 'getOneMovieByMediaId']).as('movies.show.one')

/**
 * games
 */
router.get('/jeuxvideo', [GamesController, 'getAllGames']).as('games.show')
router.get('/jeuvideo/:mediaId', [GamesController, 'getOneGameByMediaId']).as('games.show.one')

/**
 * series
 */
router.get('/series', [SeriesController, 'getAllSeries']).as('series.show')
router.get('/serie/:mediaId', [SeriesController, 'getOneSeriesById']).as('series.show.one')

/**
 * books
 */
router.get('/livres', [BooksController, 'getAllBooks']).as('books.show')
router.get('/livre/:mediaId', [BooksController, 'getOneBookByMediaId']).as('books.show.one')

/**
 * anime
 */
router.get('/animes', [AnimeController, 'getAllAnime']).as('anime.show')
router.get('/anime/:mediaId', [AnimeController, 'getOneAnimeById']).as('anime.show.one')

/**
 * covers
 */
router.get('/covers', [CoversController, 'getAllCovers'])
//ADMIN
router.post('media/:mediaId/cover', [CoversController, 'addOneCover']).as('cover.add')
router.put('media/:mediaId/cover', [CoversController, 'updateOneCover']).as('cover.update')
router.delete('media/:mediaId/cover', [CoversController, 'deleteOneCover']).as('cover.delete')
