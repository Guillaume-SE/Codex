import ContributorService from '#services/contributor_service'
import { manageContributorValidator } from '#validators/contributor_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ContributorsController {
  constructor(readonly contributorService: ContributorService) {}

  public async addOneContributor({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(manageContributorValidator)
      const contributor = await this.contributorService.addOneContributor(data)
      return response.status(201).json(contributor)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async updateOneContributor({ params, request, response }: HttpContext) {
    const contributorId = params.contributorId

    try {
      const data = await request.validateUsing(manageContributorValidator)
      const contributor = await this.contributorService.updateOneContributor(data, contributorId)
      return response.status(201).json(contributor)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async deleteOneContributor({ params, response }: HttpContext) {
    const contributorId = params.contributorId

    try {
      await this.contributorService.deleteOneContributor(contributorId)
      return response.status(202)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }
}
