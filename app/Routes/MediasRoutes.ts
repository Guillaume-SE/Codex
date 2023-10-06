import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'MediasController.index')
  Route.get('/:id', 'MediasController.show')

  //ADMIN
  Route.post('/', 'MediasController.store')
  Route.put('/:id', 'MediasController.update')
  Route.delete('/:id', 'MediasController.destroy')
})
  .prefix('/medias')
  .prefix('/api')
