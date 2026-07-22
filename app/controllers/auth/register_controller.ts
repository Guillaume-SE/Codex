import User from '#models/user'
import { registerValidator } from '#validators/auth_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/register', {})
  }

  async store({ request, response, auth }: HttpContext) {
    const { remember, ...userData } = await request.validateUsing(registerValidator)
    const user = await User.create(userData)

    await auth.use('web').login(user, !!remember)
    return response.redirect().toIntendedRoute('home')
  }
}
