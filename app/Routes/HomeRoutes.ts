import Route from '@ioc:Adonis/Core/Route'
import 'App/Routes/UsersRoutes'
import 'App/Routes/MediasRoutes'
import 'App/Routes/GamesRoutes'
import 'App/Routes/MoviesRoutes'
import 'App/Routes/ReviewsRoutes'
import 'App/Routes/CoversRoutes'

Route.get('/', async () => {
  return 'Home'
}).as('home')
