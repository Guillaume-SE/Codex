import type { IContributor } from '#interfaces/contributor_interface'
import Contributor from '#models/contributor'
import { inject } from '@adonisjs/core'

@inject()
export default class ContributorService {
  public async store(contributor: IContributor) {
    const newContributor = await Contributor.create(contributor)

    return newContributor
  }

  public async update(updatedContributor: IContributor, contributorId: number) {
    const contributor = await Contributor.findOrFail(contributorId)

    await contributor.merge(updatedContributor).save()

    return contributor
  }

  public async delete(contributorId: number) {
    const contributor = await Contributor.findOrFail(contributorId)

    await contributor.delete()
  }
}
