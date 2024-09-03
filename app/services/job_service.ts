import type { IJob } from '#interfaces/job_interface'
import Job from '#models/job'
import MediaContributor from '#models/media_contributor'
import { inject } from '@adonisjs/core'

@inject()
export default class JobService {
  public async addOneJob(job: IJob) {
    const existingSameJob = await Job.findBy('name', job.name)
    if (existingSameJob) {
      throw new Error('Ce job a déjà été ajouté')
    }

    const newJob = await Job.create(job)

    return newJob
  }

  public async updateOneJob(updatedJob: IJob, jobId: number) {
    const validSelectedJob = await Job.find(jobId)
    if (!validSelectedJob) {
      throw new Error("Le job selectionné n'existe pas")
    }
    const isUpdatedJobAlreadyExist = await Job.findBy('name', updatedJob.name)
    if (isUpdatedJobAlreadyExist) {
      throw new Error('Ce job a déjà été ajouté')
    }
    await validSelectedJob.merge(updatedJob).save()

    return updatedJob
  }

  public async deleteOneJob(jobId: number) {
    const validSelectedJob = await Job.find(jobId)
    if (!validSelectedJob) {
      throw new Error("La plateforme selectionnée n'existe pass")
    }
    const mediaUsingSelectedJob = await MediaContributor.findBy('jobId', validSelectedJob.id)
    if (mediaUsingSelectedJob) {
      throw new Error('Impossible de supprimer car un ou plusieurs media utilisent ce job')
    }
    await validSelectedJob.delete()
  }
}
