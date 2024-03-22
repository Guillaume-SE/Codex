import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'SeasonsController.getAllSeasons')
  Route.get('/:mediaId', 'SeasonsController.getOneSeasonByMediaId')

  //ADMIN
  Route.post('/', 'SeasonsController.addOneSeason')
  Route.put('/:id', 'SeasonsController.updateOneSeason')
})
  .prefix('/seasons')
  .prefix('/api')
