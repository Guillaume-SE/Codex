import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Media from 'App/Models/Media'

export default class MediasController {
  public async index({}: HttpContextContract) {
    const media = await Media.all()
    return media;
  }
  public async show({ params }: HttpContextContract) {
    return `Return the media with id ${params.id}`
  }

  //ADMIN
  public async store({ request, response }: HttpContextContract) {
    const data = request.body()
    if( data.synopsis === null || data.synopsis === "" || data.synopsis === undefined) {
      data.synopsis = "N/A"
    }
    const media = await Media.create(data)
    response.status(201)
    return media
  }

  public async update({ params }: HttpContextContract) {
    return `Updated the media with id ${params.id}`
  }

  public async destroy({ params }: HttpContextContract) {
    return `Deleted the media with id ${params.id}`
  }
}
