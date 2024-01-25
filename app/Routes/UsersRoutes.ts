import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/:id', 'UsersController.show').as('users.show')
})
  .prefix('/users')
  .prefix('/api')
