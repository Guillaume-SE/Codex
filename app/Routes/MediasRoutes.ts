import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'MediasController.getAllMedias')
  Route.get('/:id', 'MediasController.getOneMediaById')
  // Route.get('/query', 'MediasController.getOneById')

  //ADMIN
  Route.delete('/:id', 'MediasController.deleteOneMedia')
})
  .prefix('/medias')
  .prefix('/api')
