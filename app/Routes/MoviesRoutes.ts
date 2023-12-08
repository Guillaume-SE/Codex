import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'MoviesController.getAllMoviesWithReviews')
  Route.get('/:mediaId', 'MoviesController.getOneMovieWithReviewByMediaId')
})
  .prefix('/movies')
  .prefix('/api')
