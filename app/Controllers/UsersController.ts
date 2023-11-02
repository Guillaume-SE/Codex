import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const user = await User.all()
    return user
  }
  public async show({ params }: HttpContextContract) {
    return `Return the user with id ${params.id}`
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.body()
    const user = await User.create(data)
    response.status(201)
    return user
  }
  //ADMIN
  public async update({ params }: HttpContextContract) {
    return `Updated the game with id ${params.id}`
  }
}
