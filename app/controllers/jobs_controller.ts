import JobService from '#services/job_service'
import { manageJobValidator } from '#validators/job_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class JobsController {
  constructor(readonly jobService: JobService) {}

  public async addOneJob({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(manageJobValidator)
      const job = await this.jobService.addOneJob(data)
      return response.status(201).json(job)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async updateOneJob({ params, request, response }: HttpContext) {
    const jobId = params.jobId

    try {
      const data = await request.validateUsing(manageJobValidator)
      const job = await this.jobService.updateOneJob(data, jobId)
      return response.status(201).json(job)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  public async deleteOneJob({ params, response }: HttpContext) {
    const jobId = params.jobId

    try {
      await this.jobService.deleteOneJob(jobId)
      return response.status(202)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }
}
