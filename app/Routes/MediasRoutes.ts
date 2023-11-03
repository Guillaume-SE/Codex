import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'MediasController.getAll').as('medias.index')
  Route.get('/:id', 'MediasController.getOneById').as('medias.show')
  // Route.get('/query', 'MediasController.getOneById')

  //ADMIN
  Route.post('/', 'MediasController.addOne').as('medias.store')
  Route.put('/:id', 'MediasController.updateOne').as('medias.update')
  Route.delete('/:id', 'MediasController.deleteOne').as('medias.delete')
})
  .prefix('/medias')
  .prefix('/api')
