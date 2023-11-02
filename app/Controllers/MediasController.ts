import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Media from 'App/Models/Media'

export default class MediasController {
  public async getAll({ response }: HttpContextContract) {
    const media = await Media.all()
    return response.json(media)
  }

  public async getById({ params, response }: HttpContextContract) {
    const mediaId = params.id
    const media = await Media.find(mediaId)
    if (!media) {
      const message = 'Y a rien'
      return response.status(404).json(message)
    }
    response.status(201)
    return media
  }

  //ADMIN
  public async addOne({ request, response }: HttpContextContract) {
    const data = request.body()
    const media = await Media.create(data)
    response.status(201)
    return media
  }

  public async update({ request, params, response }: HttpContextContract) {
    const mediaId = params.id
    const data = request.body()
    const media = await Media.find(mediaId)
    if (!media) {
      const message = 'Aucun media trouvé'
      return response.status(404).json(message)
    }
    media.merge(data).save()
    response.json(media)
  }

  public async destroy({ params }: HttpContextContract) {
    return `Deleted the media with id ${params.id}`
  }
}
