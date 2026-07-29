import { UserSchema } from '#database/schema'
import { errors } from '@adonisjs/auth'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbRememberMeTokensProvider } from '@adonisjs/auth/session'
import { compose, safeTiming } from '@adonisjs/core/helpers'
import string from '@adonisjs/core/helpers/string'
import hash from '@adonisjs/core/services/hash'
import { beforeCreate } from '@adonisjs/lucid/orm'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'],
  passwordColumnName: 'password',
})

export default class User extends compose(UserSchema, AuthFinder) {
  static rememberMeTokens = DbRememberMeTokensProvider.forModel(User)
  declare plainRecoveryCode?: string

  private static generateUserFriendlyCode(): string {
    // to have consistent code format
    const cleanCode = string.random(32).replace(/[-_]/g, '').toUpperCase()
    return cleanCode
      .slice(0, 16)
      .match(/.{1,4}/g)!
      .join('-')
  }

  async generateNewRecoveryCode(): Promise<string> {
    const rawRecoveryCode = (this.constructor as typeof User).generateUserFriendlyCode()

    this.plainRecoveryCode = rawRecoveryCode
    this.recoveryCode = await hash.make(rawRecoveryCode)

    return rawRecoveryCode
  }

  @beforeCreate()
  static async assignDefaults(user: User) {
    user.shareCode = string.random(16)
    await user.generateNewRecoveryCode()
  }

  static async verifyRecoveryCode(username: string, recoveryCode: string): Promise<User> {
    return safeTiming(1000, async (timing) => {
      const user = await this.findBy('username', username)

      if (user && user.recoveryCode) {
        const isValid = await hash.use('scrypt').verify(user.recoveryCode, recoveryCode)
        if (isValid) {
          // if everything ok, early return
          timing.returnEarly()
          return user
        }
      }

      throw new errors.E_INVALID_CREDENTIALS('Invalid username or recovery code')
    })
  }
}
