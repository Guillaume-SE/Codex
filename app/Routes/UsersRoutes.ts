import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/:id', 'UsersController.show').as('users.show')

  Route.get('/', 'UsersController.index').as('index.users')
  Route.post('/', 'UsersController.store')
  //ADMIN
  Route.put('/:id', 'UsersController.update').as('users.update')
})
  .prefix('/users')
  .prefix('/api')
