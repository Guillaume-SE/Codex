import type { IMediaStatus } from '#interfaces/media_status_interface'
import Media from '#models/media'
import MediaStatus from '#models/media_status'
import { inject } from '@adonisjs/core'

@inject()
export default class MediaStatusService {
  public async addOne(status: IMediaStatus) {
    const existingSameStatus = await MediaStatus.findBy('name', status.name)
    if (existingSameStatus) {
      throw new Error('Ce statut existe déjà')
    }

    const newStatus = await MediaStatus.create(status)

    return newStatus
  }

  public async updateOne(updatedStatus: IMediaStatus, statusId: number) {
    const validSelectedStatus = await MediaStatus.find(statusId)
    if (!validSelectedStatus) {
      throw new Error("Le statut selectionnée n'existe pas")
    }
    const isUpdatedStatusAlreadyExist = await MediaStatus.findBy('name', updatedStatus.name)
    if (isUpdatedStatusAlreadyExist) {
      throw new Error('Ce statut existe déjà')
    }
    await validSelectedStatus.merge(updatedStatus).save()

    return updatedStatus
  }

  public async deleteOne(statusId: number) {
    const validSelectedStatus = await MediaStatus.find(statusId)
    if (!validSelectedStatus) {
      throw new Error("Le statut selectionnée n'existe pas")
    }
    const mediaUsingSelectedStatus = await Media.findBy('categoryId', validSelectedStatus.id)
    if (mediaUsingSelectedStatus) {
      throw new Error('Impossible de supprimer car un ou plusieurs media utilisent ce statut')
    }
    await validSelectedStatus.delete()
  }
}
