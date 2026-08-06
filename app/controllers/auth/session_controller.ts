import { SessionService } from '#services/auth/session_service'
import { loginValidator } from '#validators/auth_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/login', {})
  }

  @inject()
  async store({ request, response }: HttpContext, sessionService: SessionService) {
    const data = await request.validateUsing(loginValidator)

    const user = await sessionService.login({ data })

    if (!user) {
      return response.redirect().back()
    }

    return response.redirect().toIntendedRoute('home')
  }

  async destroy({ auth, session, response }: HttpContext) {
    await auth.use('web').logout()
    session.clear()

    return response.redirect().toRoute('home')
  }
}
