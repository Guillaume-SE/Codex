import ContributorService from '#services/contributor_service'
import {
  createContributorValidator,
  deleteContributorValidator,
  updateContributorValidator,
} from '#validators/contributor_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ContributorsController {
  constructor(readonly contributorService: ContributorService) {}

  public async addOne({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createContributorValidator)
      const contributor = await this.contributorService.store(data)

      return response.status(201).json(contributor)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async updateOne({ params, request, response }: HttpContext) {
    const contributorId = params.contributorId

    try {
      const { params, ...data } = await request.validateUsing(updateContributorValidator)
      const contributor = await this.contributorService.update(data, contributorId)

      return response.status(201).json(contributor)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async deleteOne({ request, params, response }: HttpContext) {
    const contributorId = params.contributorId

    try {
      await request.validateUsing(deleteContributorValidator)
      await this.contributorService.delete(contributorId)

      return response.status(202)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }
}
