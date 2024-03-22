import Route from '@ioc:Adonis/Core/Route'
import 'App/Routes/BooksRoutes'
import 'App/Routes/CoversRoutes'
import 'App/Routes/GamesRoutes'
import 'App/Routes/MediasRoutes'
import 'App/Routes/MoviesRoutes'
import 'App/Routes/ReviewsRoutes'
import 'App/Routes/SeasonsRoutes'
import 'App/Routes/UsersRoutes'

Route.get('/', async () => {
  return 'Home'
}).as('home')
