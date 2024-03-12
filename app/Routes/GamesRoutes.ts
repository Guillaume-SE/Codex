import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'GamesController.getAllGames')
  Route.get('/:mediaId', 'GamesController.getOneGameByMediaId')

  //ADMIN
  Route.post('/', 'GamesController.addOneGame')
  Route.put('/:id', 'GamesController.updateOneGame')
})
  .prefix('/games')
  .prefix('/api')
