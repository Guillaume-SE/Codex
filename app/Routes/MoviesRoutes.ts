import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'MoviesController.getAllMoviesWithReviews')
  Route.get('/:id', 'MoviesController.getOneMoviesById')
})
  .prefix('/movies')
  .prefix('/api')
