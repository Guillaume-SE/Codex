import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'MoviesController.getAllMovies')
  Route.get('/:mediaId', 'MoviesController.getOneMovieByMediaId')

  //ADMIN
  Route.post('/', 'MoviesController.addOneMovie')
  Route.put('/:id', 'MoviesController.updateOneMovie')
})
  .prefix('/movies')
  .prefix('/api')
