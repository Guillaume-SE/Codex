import User from '#models/user'
import { AuthLimiterService } from '#services/auth/auth_limiter_service'
import { loginValidator } from '#validators/auth_validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import limiter from '@adonisjs/limiter/services/main'
import { Infer } from '@vinejs/vine/types'

type Params = {
  data: Infer<typeof loginValidator>
}

@inject()
export class SessionService {
  constructor(
    protected ctx: HttpContext,
    protected authLimiter: AuthLimiterService
  ) {}

  async login({ data }: Params): Promise<User | null> {
    const { username, password, remember } = data
    const { auth } = this.ctx

    const user = await this.authLimiter.attempt(
      {
        prefix: 'login',
        username,
        userRequests: 5,
        ipRequests: 20,
      },
      () => User.verifyCredentials(username, password)
    )

    if (!user) {
      return null
    }

    await auth.use('web').login(user, !!remember)

    return user
  }
}
