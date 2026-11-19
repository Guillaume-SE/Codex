import type { UnifiedSeasonDetail } from '#types/media'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class PresentedSeasonDetailTransformer extends BaseTransformer<UnifiedSeasonDetail> {
  toObject() {
    return this.pick(this.resource, [
      'apiId',
      'seriesApiId',
      'name',
      'seasonNumber',
      'overview',
      'posterUrl',
      'airDate',
      'airYear',
      'rating',
      'episodes',
    ])
  }
}
