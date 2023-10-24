import Route from '@ioc:Adonis/Core/Route'
import 'App/Routes/UsersRoutes'
import 'App/Routes/MediasRoutes'

Route.get('/', async () => {
  return 'Home'
}).as('home')
