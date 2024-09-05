import type { IContributor } from '#interfaces/contributor_interface'
import Contributor from '#models/contributor'
import MediaContributor from '#models/media_contributor'
import { inject } from '@adonisjs/core'

@inject()
export default class ContributorService {
  public async addOneContributor(contributor: IContributor) {
    const existingSameContributor = await Contributor.findBy('name', contributor.name)
    if (existingSameContributor) {
      throw new Error('Ce contributeur a déjà été ajouté')
    }

    const newContributor = await Contributor.create(contributor)

    return newContributor
  }

  public async updateOneContributor(updatedContributor: IContributor, contributorId: number) {
    const validSelectedContributor = await Contributor.find(contributorId)
    if (!validSelectedContributor) {
      throw new Error("Le contributeur selectionné n'existe pas")
    }
    const isUpdatedContributorAlreadyExist = await Contributor.findBy(
      'name',
      updatedContributor.name
    )
    if (isUpdatedContributorAlreadyExist) {
      throw new Error('Ce contributeur a déjà été ajouté')
    }
    await validSelectedContributor.merge(updatedContributor).save()

    return updatedContributor
  }

  public async deleteOneContributor(contributorId: number) {
    const validSelectedContributor = await Contributor.find(contributorId)
    if (!validSelectedContributor) {
      throw new Error("Le contributeur selectionné n'existe pas")
    }
    const mediaUsingSelectedContributor = await MediaContributor.findBy(
      'contributorId',
      validSelectedContributor.id
    )
    if (mediaUsingSelectedContributor) {
      throw new Error('Impossible de supprimer car un ou plusieurs media utilisent ce contributeur')
    }
    await validSelectedContributor.delete()
  }
}
