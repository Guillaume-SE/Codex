import ContributorRoleService from '#services/contributor_role_service'
import {
  createContributorRoleValidator,
  deleteContributorRoleValidator,
  updateContributorRoleValidator,
} from '#validators/contributor_role_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ContributorsRolesController {
  constructor(readonly contributorRoleService: ContributorRoleService) {}

  public async addOne({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createContributorRoleValidator)
      const contributorRole = await this.contributorRoleService.store(data)

      return response.status(201).json(contributorRole)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async updateOne({ params, request, response }: HttpContext) {
    const contributorRoleId = params.roleId

    try {
      const { params, ...data } = await request.validateUsing(updateContributorRoleValidator)
      const contributorRole = await this.contributorRoleService.update(data, contributorRoleId)

      return response.status(201).json(contributorRole)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async deleteOne({ request, params, response }: HttpContext) {
    const contributorRoleId = params.roleId

    try {
      await request.validateUsing(deleteContributorRoleValidator)

      await this.contributorRoleService.delete(contributorRoleId)

      return response.status(202)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }
}
