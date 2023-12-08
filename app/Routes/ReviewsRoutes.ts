import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'ReviewsController.getAllReviews')

  //ADMIN
  Route.post('/:mediaId', 'ReviewsController.addOneReview')
  Route.put('/:mediaId', 'ReviewsController.updateOneReview')
})
  .prefix('/reviews')
  .prefix('/api')
