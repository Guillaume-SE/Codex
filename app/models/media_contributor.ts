import Contributor from '#models/contributor'
import ContributorRole from '#models/contributor_role'
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

  @column({ columnName: 'role_id', serializeAs: 'roleId' })
  declare roleId: number

  // relations
  @belongsTo(() => Media, {
    foreignKey: 'mediaId',
  })
  declare media: BelongsTo<typeof Media>

  @belongsTo(() => Contributor, {
    foreignKey: 'contributorId',
  })
  declare contributor: BelongsTo<typeof Contributor>

  @belongsTo(() => ContributorRole, {
    foreignKey: 'roleId',
  })
  declare role: BelongsTo<typeof ContributorRole>
}
