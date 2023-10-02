import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MoviesController {
  public async index({}: HttpContextContract) {
    return 'List all movies'
  }
  public async show({ params }: HttpContextContract) {
    return `Return the movie with id ${params.id}`
  }

  //ADMIN
  public async store({}) {
    return `movie stored`
  }
  public async update({ params }: HttpContextContract) {
    return `Updated the movie with id ${params.id}`
  }
  public async destroy({ params }: HttpContextContract) {
    return `Deleted the movie with id ${params.id}`
  }
}
