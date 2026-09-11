import type { UnifiedMediaDetail } from '#types/media'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class PresentedMediaDetailTransformer extends BaseTransformer<UnifiedMediaDetail> {
  toObject() {
    return this.pick(this.resource, [
      'apiId',
      'provider',
      'category',
      'title',
      'releaseDate',
      'posterUrl',
      'rating',
      'overview',
      'genres',
      'status',
      'runtime',
      'numberOfSeasons',
      'numberOfEpisodes',
      'trailerKey',
      'budget',
      'revenue',
      'belongsToCollection',
      'originCountry',
      'spokenLanguages',
      'productionCompanies',
      'crew',
      'cast',
      'recommendations',
    ])
  }
}
