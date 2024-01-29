import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'CoversController.getAllCovers')
  Route.put('/:mediaId', 'CoversController.updateOneCover')
  Route.delete('/:mediaId', 'CoversController.deleteOneCover')
})
  .prefix('/covers')
  .prefix('/api')
