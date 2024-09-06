import ContributorRoleService from '#services/contributor_role_service'
import { manageContributorRoleValidator } from '#validators/contributor_role_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ContributorsRolesController {
  constructor(readonly contributorRoleService: ContributorRoleService) {}

  public async addOneContributorRole({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(manageContributorRoleValidator)
      const contributorRole = await this.contributorRoleService.addOneContributorRole(data)
      return response.status(201).json(contributorRole)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async updateOneContributorRole({ params, request, response }: HttpContext) {
    const contributorRoleId = params.contributorRoleId

    try {
      const data = await request.validateUsing(manageContributorRoleValidator)
      const contributorRole = await this.contributorRoleService.updateOneContributorRole(
        data,
        contributorRoleId
      )
      return response.status(201).json(contributorRole)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async deleteOneContributorRole({ params, response }: HttpContext) {
    const contributorRoleId = params.contributorRoleId

    try {
      await this.contributorRoleService.deleteOneContributorRole(contributorRoleId)
      return response.status(202)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }
}
