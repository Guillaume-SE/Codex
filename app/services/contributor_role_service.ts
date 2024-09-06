import type { IContributorRole } from '#interfaces/contributor_role_interface'
import ContributorRole from '#models/contributor_role'
import MediaContributor from '#models/media_contributor'
import { inject } from '@adonisjs/core'

@inject()
export default class ContributorRoleService {
  public async addOneContributorRole(contributorRole: IContributorRole) {
    const existingSameContributorRole = await ContributorRole.findBy('name', contributorRole.name)
    if (existingSameContributorRole) {
      throw new Error('Ce rôle a déjà été ajouté')
    }

    const newContributorRole = await ContributorRole.create(contributorRole)

    return newContributorRole
  }

  public async updateOneContributorRole(
    updatedContributorRole: IContributorRole,
    contributorRoleId: number
  ) {
    const validSelectedContributorRole = await ContributorRole.find(contributorRoleId)
    if (!validSelectedContributorRole) {
      throw new Error("Le rôle selectionné n'existe pas")
    }
    const isUpdatedContributorRoleAlreadyExist = await ContributorRole.findBy(
      'name',
      updatedContributorRole.name
    )
    if (isUpdatedContributorRoleAlreadyExist) {
      throw new Error('Ce rôle a déjà été ajouté')
    }
    await validSelectedContributorRole.merge(updatedContributorRole).save()

    return updatedContributorRole
  }

  public async deleteOneContributorRole(contributorRoleId: number) {
    const validSelectedContributorRole = await ContributorRole.find(contributorRoleId)
    if (!validSelectedContributorRole) {
      throw new Error("Le rôle selectionné n'existe pas")
    }
    const mediaUsingSelectedContributorRole = await MediaContributor.findBy(
      'contributorRoleId',
      validSelectedContributorRole.id
    )
    if (mediaUsingSelectedContributorRole) {
      throw new Error('Impossible de supprimer car un ou plusieurs media utilisent ce rôle')
    }
    await validSelectedContributorRole.delete()
  }
}
