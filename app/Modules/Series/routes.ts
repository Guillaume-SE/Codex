import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'SeriesController.index')
  Route.get('/:id', 'SeriesController.show')
  //ADMIN
  Route.post('/', 'SeriesController.store')
  Route.put('/:id', 'SeriesController.update')
  Route.delete('/:id', 'SeriesController.destroy')
})
  .namespace('App/Modules/Series')
  .prefix('/series')
  .prefix('/api')