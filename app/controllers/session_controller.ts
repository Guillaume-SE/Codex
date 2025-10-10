import AuthService from '#services/auth_service'
import { loginValidator } from '#validators/auth_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async show({ inertia }: HttpContext) {
    return inertia.render('auth/Login')
  }

  @inject()
  async login({ request, response }: HttpContext, authService: AuthService) {
    const data = await request.validateUsing(loginValidator)

    const user = await authService.login(data)

    if (!user) {
      return response.redirect().back()
    }

    return response.redirect().toRoute('dashboard.home')
  }

  async logout({ auth, session, response }: HttpContext) {
    await auth.use('web').logout()

    session.flash('success', 'Déconnexion réussie 👋')
    return response.redirect().toRoute('home')
  }
}
