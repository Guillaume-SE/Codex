import User from '#models/user'
import { loginValidator } from '#validators/auth_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/login', {})
  }

  async store({ request, auth, response }: HttpContext) {
    const { username, password, remember } = await request.validateUsing(loginValidator)
    console.log(username, password, remember)
    const user = await User.verifyCredentials(username, password)

    await auth.use('web').login(user, !!remember)
    return response.redirect().toIntendedRoute('home')
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('home')
  }
}
