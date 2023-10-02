import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'MoviesController.index')
  Route.get('/:id', 'MoviesController.show')
  //ADMIN
  Route.post('/', 'MoviesController.store')
  Route.put('/:id', 'MoviesController.update')
  Route.delete('/:id', 'MoviesController.destroy')
})
  .namespace('App/Modules/Movies')
  .prefix('/movies')
  .prefix('/api')
