import type { HttpContext } from '@adonisjs/core/http'

export default class OnboardingsController {
  async show({ session, response, inertia }: HttpContext) {
    const recoveryCode = session.get('pendingRecoveryCode')

    if (!recoveryCode) {
      return response.redirect().toRoute('home')
    }

    return inertia.render('auth/onboardings', {
      recoveryCode,
    })
  }

  async destroy({ session, response }: HttpContext) {
    session.forget('pendingRecoveryCode')

    return response.redirect().toRoute('home')
  }
}
