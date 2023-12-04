import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'MediasController.getAllMedias')
  Route.get('/movies', 'MediasController.getAllMoviesWithReviews')
  Route.get('/games', 'MediasController.getAllGamesWithReviews')
  Route.get('/:id', 'MediasController.getOneMediaById')
  // Route.get('/query', 'MediasController.getOneById')

  //ADMIN
  Route.post('/', 'MediasController.addOneMedia')
  Route.put('/:id', 'MediasController.updateOneMedia')
  Route.delete('/:id', 'MediasController.deleteOneMedia')
})
  .prefix('/medias')
  .prefix('/api')
