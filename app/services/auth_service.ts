import User from '#models/user'
import { loginValidator } from '#validators/auth_validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import limiter from '@adonisjs/limiter/services/main'
import { Infer } from '@vinejs/vine/types'

@inject()
export default class AuthService {
  constructor(protected ctx: HttpContext) {}

  async login(data: Infer<typeof loginValidator>): Promise<User | null> {
    const { uid, password, remember } = data
    const { request, auth, session } = this.ctx

    const loginLimiter = limiter.use({
      requests: 5,
      duration: '1 mins',
      blockDuration: '10 mins',
    })

    const key = `login_${request.ip()}_${uid}`

    const [error, user] = await loginLimiter.penalize(key, () => {
      return User.verifyCredentials(uid, password)
    })

    if (error) {
      session.flashErrors({
        E_TOO_MANY_REQUESTS: `Trop de tentatives. Réessayez dans ${error.response.availableIn} secondes`,
      })
      return null
    }

    if (!user) {
      return null
    }

    await loginLimiter.delete(key)
    await auth.use('web').login(user, remember)
    return user
  }
}
