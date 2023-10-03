import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const test = {
      1: {
        id: 1,
        name: 'Iron',
        email: 'iron@iron.fr',
        password: 'iron',
      },
      2: {
        id: 2,
        name: 'Wanda',
        email: 'wanda@wanda.fr',
        password: 'wanda',
      },
    }
    return test
  }
  public async show({ params }: HttpContextContract) {
    return `Return the user with id ${params.id}`
  }

  //ADMIN
  public async store({}) {
    return `User stored`
  }
  public async update({ params }: HttpContextContract) {
    return `Updated the game with id ${params.id}`
  }
  public async destroy({ params }: HttpContextContract) {
    return `Deleted the game with id ${params.id}`
  }
}
