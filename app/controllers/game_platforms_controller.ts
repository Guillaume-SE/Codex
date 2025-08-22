import { ListPresenter } from '#classes/ListPresenter'
import type GamePlatform from '#models/game_platform'
import GamePlatformService from '#services/game_platform_service'
import { searchValidator } from '#validators/dashboard_validator'
import {
  createGamePlatformValidator,
  updateGamePlatformValidator,
} from '#validators/game_platform_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class GamePlatformsController {
  constructor(private gamePlatformService: GamePlatformService) {}

  async showManage({ inertia, request }: HttpContext) {
    const page = request.input('page')
    const filters = await request.validateUsing(searchValidator)
    const platformList = await GamePlatformService.getFiltered(filters, page, 10)

    platformList.baseUrl('/admin/platforms/manage')

    const platformMapper = (platform: GamePlatform) => {
      return {
        id: platform.id,
        name: platform.name,
        count: platform.$extras.gameInfo_count,
      }
    }

    const listPresenter = new ListPresenter()
    const presentedPlatformList = listPresenter.present(platformList, platformMapper)

    return inertia.render('admin/ManageGamePlatform', {
      platformList: presentedPlatformList,
    })
  }

  async store({ request, session, response }: HttpContext) {
    const data = await request.validateUsing(createGamePlatformValidator)
    await this.gamePlatformService.storeOrUpdate(data)

    session.flash('success', `${data.name} ajoutée avec succès`)
    return response.redirect().toRoute('platforms.index')
  }

  async update({ params, request, session, response }: HttpContext) {
    const data = await request.validateUsing(updateGamePlatformValidator, {
      meta: { params: params },
    })
    await this.gamePlatformService.storeOrUpdate(data, params.platformId)

    session.flash('success', `${data.name} modifiée avec succès`)
    return response.redirect().toRoute('platforms.index')
  }

  public async destroy({ params, session, response }: HttpContext) {
    const platformDeleted = await this.gamePlatformService.delete(params.platformId)

    session.flash('success', `${platformDeleted} supprimée avec succès`)
    return response.redirect().toRoute('platforms.index')
  }
}
