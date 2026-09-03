import type { UnifiedMediaItem } from '#types/media'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class PresentedMediaTransformer extends BaseTransformer<UnifiedMediaItem> {
  toObject() {
    return this.pick(this.resource, [
      'apiId',
      'provider',
      'category',
      'title',
      'releaseDate',
      'posterUrl',
      'rating',
    ])
  }
}
