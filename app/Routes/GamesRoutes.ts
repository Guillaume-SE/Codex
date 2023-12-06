import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'GamesController.getAllGamesWithReviews')
  Route.get('/:id', 'MediasController.getOneMediaById')
})
  .prefix('/games')
  .prefix('/api')
