import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SeriesController {
  public async index({}: HttpContextContract) {
    return 'List all series'
  }
  public async show({ params }: HttpContextContract) {
    return `Return the series with id ${params.id}`
  }

  //ADMIN
  public async store({}) {
    return `Series stored`
  }
  public async update({ params }: HttpContextContract) {
    return `Updated the series with id ${params.id}`
  }
  public async destroy({ params }: HttpContextContract) {
    return `Deleted the series with id ${params.id}`
  }
}
