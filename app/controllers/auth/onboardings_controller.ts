import type { HttpContext } from '@adonisjs/core/http'

export default class OnboardingsController {
  async show({ session, response, inertia }: HttpContext) {
    const recoveryCode = session.get('pendingRecoveryCode')
    const isRecovery = session.get('pendingRecoveryReason') === 'recovery'

    if (!recoveryCode) {
      return response.redirect().toRoute('home')
    }

    return inertia.render('auth/onboardings', {
      recoveryCode,
      isRecovery,
    })
  }

  async destroy({ session, response }: HttpContext) {
    session.forget('pendingRecoveryCode')
    session.forget('pendingRecoveryReason')

    return response.redirect().toRoute('home')
  }
}
