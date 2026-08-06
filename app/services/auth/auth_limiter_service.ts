import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import limiter from '@adonisjs/limiter/services/main'

export interface AuthLimiterOptions {
  prefix: 'login' | 'recovery'
  username: string
  userRequests: number
  ipRequests: number
}

@inject()
export class AuthLimiterService {
  constructor(protected ctx: HttpContext) {}

  /**
   * Runs an authentication action through an IP + Username multi-limiter.
   */
  async attempt<T>(options: AuthLimiterOptions, action: () => Promise<T>): Promise<T | null> {
    const { request, session } = this.ctx
    const { prefix, username, userRequests, ipRequests } = options

    const ipKey = `${prefix}_ip_${request.ip()}`
    const userKey = `${prefix}_user_${request.ip()}_${username}`

    const multiLimiter = limiter.multi([
      {
        key: userKey,
        requests: userRequests,
        duration: '1 min',
        blockDuration: '15 mins',
      },
      {
        key: ipKey,
        requests: ipRequests,
        duration: '1 min',
        blockDuration: '30 mins',
      },
    ])

    const [error, result] = await multiLimiter.penalize(action)

    if (error) {
      session.flashAll()
      session.flash(
        'error',
        `Trop de tentatives. Réessayez dans ${error.response.availableIn} secondes`
      )
      return null
    }

    return result
  }
}
