import Route from "@ioc:Adonis/Core/Route"

Route.group(() => {
  Route.get("/", "MediasController.getAllMedias")
  Route.get("/:id", "MediasController.getOneMediaById")

  //ADMIN
  Route.delete("/:id", "MediasController.deleteOneMedia")
})
  .prefix("/medias")
  .prefix("/api")
