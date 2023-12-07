import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'MoviesController.getAllMoviesWithReviews')
  Route.get('/:mediaId', 'MoviesController.getOneMovieWithReviewById')
})
  .prefix('/movies')
  .prefix('/api')
