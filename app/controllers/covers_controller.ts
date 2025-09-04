import { CoverPresenter } from '#classes/CoverPresenter'
import { CoverUtils } from '#classes/CoverUtils'
import { MediaPresenter } from '#classes/MediaPresenter'
import Cover from '#models/cover'
import Media from '#models/media'
import CoverService from '#services/cover_service'
import MediaService from '#services/media_service'
import { coverValidator } from '#validators/cover_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CoversController {
  constructor(
    readonly coverService: CoverService,
    readonly mediaService: MediaService
  ) {}

  async showManage({ inertia }: HttpContext) {
    const defaultCoverUrl = CoverPresenter.defaultCoverUrl()

    return inertia.render('admin/ManageCover', {
      defaultCoverUrl,
    })
  }

  async storeOrUpdate({ params, request, session, response }: HttpContext) {
    const { cover: newCover } = await request.validateUsing(coverValidator)
    const media = await this.mediaService.getOne(params.mediaId)

    const existingCover = await Cover.findBy('media_id', media.id)

    const uploadedCover = await this.coverService.upload(
      newCover,
      media.category.name,
      existingCover?.cloudinaryIdentifier
    )

    await this.coverService.store(params.mediaId, uploadedCover)

    const messageAction = existingCover ? 'modifiée' : 'ajoutée'
    session.flash('success', `Cover de ${media.name} ${messageAction} avec succès`)
    return response.redirect().toRoute('dashboard.home')
  }

  async updateDefault({ request, session, response }: HttpContext) {
    const { cover } = await request.validateUsing(coverValidator)

    await this.coverService.uploadDefault(cover)
    session.flash('success', `Cover par défaut modifiée avec succès`)
    return response.redirect().toRoute('dashboard.home')
  }

  public async destroy({ params, session, response }: HttpContext) {
    const media = await Media.findOrFail(params.mediaId)
    const cover = await Cover.findByOrFail('media_id', params.mediaId)

    await this.coverService.delete(cover.cloudinaryIdentifier)
    await cover.delete()

    session.flash('success', `Cover de ${media.name} supprimée avec succès`)
    return response.redirect().toRoute('dashboard.home')
  }
}
