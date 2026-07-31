import User from '#models/user'
import { AuthLimiterService } from '#services/auth/auth_limiter_service'
import { accountRecoverValidator } from '#validators/auth_validator'
import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'
import { Infer } from '@vinejs/vine/types'

type AccountRecoveryPayload = Infer<typeof accountRecoverValidator>

export interface AccountRecoverResult {
  user: User
  newPlainCode: string
}

@inject()
export class AccountRecoveryService {
  constructor(protected authLimiter: AuthLimiterService) {}

  async handle(payload: AccountRecoveryPayload): Promise<AccountRecoverResult | null> {
    const result = await this.authLimiter.attempt(
      {
        prefix: 'recovery',
        username: payload.username,
        userRequests: 3,
        ipRequests: 10,
      },
      () => this.resetUserCredentials(payload)
    )

    if (!result) {
      return null
    }

    return result
  }

  private async resetUserCredentials({
    username,
    password,
    recoveryCode,
  }: AccountRecoveryPayload): Promise<AccountRecoverResult> {
    const user = await User.verifyRecoveryCode(username, recoveryCode)

    user.password = password
    const newPlainCode = await user.generateNewRecoveryCode()
    await user.save()

    // revoke all existing remember-me sessions for security
    await db.from('remember_me_tokens').where('tokenable_id', user.id).delete()

    return {
      user,
      newPlainCode,
    }
  }
}
