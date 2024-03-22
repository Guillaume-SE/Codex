import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'BooksController.getAllBooks')
  Route.get('/:mediaId', 'BooksController.getOneBookByMediaId')

  //ADMIN
  Route.post('/', 'BooksController.addOneBook')
  Route.put('/:id', 'BooksController.updateOneBook')
})
  .prefix('/books')
  .prefix('/api')
