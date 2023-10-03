import Route from '@ioc:Adonis/Core/Route'
import 'App/Routes/GamesRoutes'
import 'App/Routes/MoviesRoutes'
import 'App/Routes/SeriesRoutes'


Route.get('/', async () => {
  return "Home";
})