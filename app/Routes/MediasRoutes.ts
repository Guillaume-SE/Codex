import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'MediasController.getAll').as('medias.index')
  Route.get('/:id', 'MediasController.getById').as('medias.show')
  // findBy

  //ADMIN
  Route.post('/', 'MediasController.addOne').as('medias.store')
  Route.put('/:id', 'MediasController.update').as('medias.update')
  Route.delete('/:id', 'MediasController.destroy').as('medias.delete')
})
  .prefix('/medias')
  .prefix('/api')
