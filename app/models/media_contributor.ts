import Contributor from '#models/contributor'
import Job from '#models/job'
import Media from '#models/media'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class MediaContributor extends BaseModel {
  public static table = 'media_contributors'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'media_id', serializeAs: 'mediaId' })
  declare mediaId: number

  @column({ columnName: 'contributor_id', serializeAs: 'contributorId' })
  declare contributorId: number

  @column({ columnName: 'job_id', serializeAs: 'jobId' })
  declare jobId: number

  // relations
  @belongsTo(() => Media)
  declare media: BelongsTo<typeof Media>

  @belongsTo(() => Contributor)
  declare contributor: BelongsTo<typeof Contributor>

  @belongsTo(() => Job)
  declare job: BelongsTo<typeof Job>
}
