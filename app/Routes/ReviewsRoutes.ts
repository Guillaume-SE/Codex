import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'ReviewsController.getAllReviews')
  Route.get('/:mediaId', 'ReviewsController.getOneReviewByMediaId')

  //ADMIN
  Route.post('/:mediaId', 'ReviewsController.addOneReview')
  Route.put('/:id', 'ReviewsController.updateOneReview')
  Route.delete('/:id', 'ReviewsController.deleteOneReview')
})
  .prefix('/reviews')
  .prefix('/api')
