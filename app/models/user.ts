import { UserSchema } from '#database/schema'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbRememberMeTokensProvider } from '@adonisjs/auth/session'
import { compose } from '@adonisjs/core/helpers'
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
    // replace to avoid weird results with hyphens or underscores
    const cleanCode = string.random(32).replace(/[-_]/g, '').toUpperCase()
    return cleanCode
      .slice(0, 16)
      .match(/.{1,4}/g)!
      .join('-')
  }

  @beforeCreate()
  static async assignDefaults(user: User) {
    user.shareCode = string.random(16)

    const rawRecoveryCode = this.generateUserFriendlyCode()
    user.plainRecoveryCode = rawRecoveryCode
    user.recoveryCode = await hash.make(rawRecoveryCode)
  }
}
