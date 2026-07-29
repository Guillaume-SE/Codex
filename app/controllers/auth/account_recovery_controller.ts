import { AccountRecoveryService } from '#services/auth/account_recovery_service'
import { accountRecoverValidator } from '#validators/auth_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AccountRecoveryController {
  constructor(protected recoveryService: AccountRecoveryService) {}

  async create({ inertia }: HttpContext) {
    return inertia.render('auth/account_recovery/create', {})
  }

  async store({ request, response, session, auth }: HttpContext) {
    const payload = await request.validateUsing(accountRecoverValidator)

    const { user, newPlainCode } = await this.recoveryService.handle(payload)

    await auth.use('web').login(user)
    session.put('pendingRecoveryCode', newPlainCode)

    return response.redirect().toRoute('onboardings.show')
  }
}
