import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MediasController {
  public async index({}: HttpContextContract) {
    const medias = [
      {
        "id": "1",
        "name": 'Halo',
        "genre": ["Action", "Fps"],
        "developper": 'Bungie',
      },
      {
        "id": 2,
        "name": 'Avengers: Infinity War',
        "genre": 'Action',
        "duration": '180',
      },
    ]
    return medias
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
