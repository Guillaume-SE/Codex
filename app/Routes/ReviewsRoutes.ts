import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'ReviewsController.getAllReviews')

  //ADMIN
  Route.put('/:mediaId', 'ReviewsController.updateOneReview')
})
  .prefix('/reviews')
  .prefix('/api')
