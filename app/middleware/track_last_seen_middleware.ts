import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { DateTime } from 'luxon'

export default class TrackLastSeenMiddleware {
  async handle({ auth, logger }: HttpContext, next: NextFn) {
    const user = auth.user

    if (user) {
      const now = DateTime.now()

      if (!user.lastLoggedAt || user.lastLoggedAt < now.minus({ hours: 1 })) {
        user.lastLoggedAt = now

        try {
          await user.save()
        } catch (error) {
          logger.error({ err: error, userId: user.id }, 'Failed to update lastLoggedAt')
        }
      }
    }

    const output = await next()
    return output
  }
}
