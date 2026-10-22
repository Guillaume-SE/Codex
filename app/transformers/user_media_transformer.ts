import UserMedia from '#models/user_media'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class UserMediaTransformer extends BaseTransformer<UserMedia> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'rating', 'progression', 'sidenote', 'isFavorite']),
      status: this.resource.status ? { name: this.resource.status.name } : null,
    }
  }
}
