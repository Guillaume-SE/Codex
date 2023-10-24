import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MediasController {
  public async index({}: HttpContextContract) {
    return `New media created !`
  }
  public async show({ params }: HttpContextContract) {
    return `Return the media with id ${params.id}`
  }

  //ADMIN
  public async store({}: HttpContextContract) {
    return 'Media stored'
  }

  public async update({ params }: HttpContextContract) {
    return `Updated the media with id ${params.id}`
  }

  public async destroy({ params }: HttpContextContract) {
    return `Deleted the media with id ${params.id}`
  }
}
