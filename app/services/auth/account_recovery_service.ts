import User from '#models/user'
import { accountRecoverValidator } from '#validators/auth_validator'
import db from '@adonisjs/lucid/services/db'
import { Infer } from '@vinejs/vine/types'

type AccountRecoveryPayload = Infer<typeof accountRecoverValidator>

export interface AccountRecoverResult {
  user: User
  newPlainCode: string
}

export class AccountRecoveryService {
  async handle({
    username,
    password,
    recoveryCode,
  }: AccountRecoveryPayload): Promise<AccountRecoverResult> {
    const user = await User.verifyRecoveryCode(username, recoveryCode)

    user.password = password
    const newPlainCode = await user.generateNewRecoveryCode()
    await user.save()

    await db.from('remember_me_tokens').where('tokenable_id', user.id).delete()

    return {
      user,
      newPlainCode,
    }
  }
}
