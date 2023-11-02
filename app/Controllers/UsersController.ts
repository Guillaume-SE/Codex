import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async show({ params }: HttpContextContract) {
    return `Return the user with id ${params.id}`
  }

  //ADMIN
  public async update({ params }: HttpContextContract) {
    return `Updated the game with id ${params.id}`
  }
}
