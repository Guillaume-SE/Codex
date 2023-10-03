import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'GamesController.index')
  Route.get('/:id', 'GamesController.show')
  //ADMIN
  Route.post('/', 'GamesController.store')
  Route.put('/:id', 'GamesController.update')
  Route.delete('/:id', 'GamesController.destroy')
})
  .namespace('App/Modules/Games')
  .prefix('/games')
  .prefix('/api')