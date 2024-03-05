import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'MoviesController.getAllMoviesWithReviews')
  Route.get('/:mediaId', 'MoviesController.getOneMovieWithReviewByMediaId')

  //ADMIN
  Route.post('/', 'MoviesController.addOneMovie')
  Route.put('/:id', 'MoviesController.updateOneMovie')
})
  .prefix('/movies')
  .prefix('/api')
