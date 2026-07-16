import User from '#models/user'
import { registerValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/register', {})
  }

  async store({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    const user = await User.create({ ...payload })

    await auth.use('web').login(user)
    response.redirect().toRoute('home')
  }
}
