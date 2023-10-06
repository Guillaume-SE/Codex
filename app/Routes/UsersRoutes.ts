import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/:id', 'UsersController.show')
  //ADMIN
  Route.put('/:id', 'UsersController.update')
})
  .prefix('/users')
  .prefix('/api')
