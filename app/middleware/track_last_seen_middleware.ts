import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'
import type { NextFn } from '@adonisjs/core/types/http'
import { DateTime } from 'luxon'

export default class TrackLastSeenMiddleware {
  async handle({ auth }: HttpContext, next: NextFn) {
    const user = auth.user

    if (user) {
      const now = DateTime.now()

      if (!user.lastLoggedAt || user.lastLoggedAt < now.minus({ hours: 1 })) {
        user.lastLoggedAt = now
        await user.save().catch((error) => {
          logger.error(
            { err: error, userId: user.id },
            'Failed to update user lastLoggedAt timestamp'
          )
        })
      }
    }

    const output = await next()
    return output
  }
}
