import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GamesController {
  public async index({}: HttpContextContract) {
    return 'List all games'
  }
  public async show({ params }: HttpContextContract) {
    return `Return the game with id ${params.id}`
  }

  //ADMIN
  public async store({}) {
    return `Game stored`
  }
  public async update({ params }: HttpContextContract) {
    return `Updated the game with id ${params.id}`
  }
  public async destroy({ params }: HttpContextContract) {
    return `Deleted the game with id ${params.id}`
  }
}
