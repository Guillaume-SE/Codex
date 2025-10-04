import User from '#models/user'
import { loginValidator } from '#validators/auth_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class SessionController {
  async show({ inertia }: HttpContext) {
    return inertia.render('auth/Login')
  }

  async login({ request, auth, response }: HttpContext) {
    const { uid, password, remember } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(uid, password)

    await auth.use('web').login(user, remember)

    return response.redirect().toRoute('dashboard.home')
  }

  async logout({ auth, session, response }: HttpContext) {
    await auth.use('web').logout()

    session.flash('success', 'Déconnexion réussie 👋')
    return response.redirect().toRoute('home')
  }
}
