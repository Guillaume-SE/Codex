import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'MediasController.index').as('index.medias')
  Route.get('/:id', 'MediasController.show').as('show.medias')

  //ADMIN
  Route.post('/', 'MediasController.store').as('store.medias')
  Route.put('/:id', 'MediasController.update').as('update.medias')
  Route.delete('/:id', 'MediasController.destroy').as('delete.medias')
})
  .prefix('/medias')
  .prefix('/api')
