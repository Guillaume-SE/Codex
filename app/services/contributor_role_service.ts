import type { IContributorRole } from '#interfaces/contributor_role_interface'
import ContributorRole from '#models/contributor_role'
import { inject } from '@adonisjs/core'

@inject()
export default class ContributorRoleService {
  public async store(contributorRole: IContributorRole) {
    const newRole = await ContributorRole.create(contributorRole)

    return newRole
  }

  public async update(updatedRole: IContributorRole, roleId: number) {
    const role = await ContributorRole.findOrFail(roleId)

    await role.merge(updatedRole).save()

    return role
  }

  public async delete(roleId: number) {
    const role = await ContributorRole.findOrFail(roleId)

    await role.delete()
  }
}
