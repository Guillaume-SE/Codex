import Route from '@ioc:Adonis/Core/Route'
import 'App/Modules/Games/GamesRoutes'
import 'App/Modules/Movies/MoviesRoutes'
import 'App/Modules/Series/SeriesRoutes'


Route.get('/', async () => {
  return "Home";
})