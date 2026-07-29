import User from '#models/user'
import db from '@adonisjs/lucid/services/db'
import { test } from '@japa/runner'

test.group('User | verifyRecoveryCode timing', (group) => {
  group.each.teardown(async () => {
    await db.beginGlobalTransaction()
    await db.rollbackGlobalTransaction()
  })

  test('failing attempt (user missing) takes at least 500ms', async ({ assert }) => {
    const start = performance.now()

    try {
      await User.verifyRecoveryCode('non_existent_user', 'AAAA-BBBB-CCCC-DDDD')
      assert.fail('Should have thrown E_INVALID_CREDENTIALS')
    } catch (error) {
      const duration = performance.now() - start
      assert.equal(error.code, 'E_INVALID_CREDENTIALS')
      assert.isAtLeast(duration, 980, `Execution took ${duration}ms, expected >= 980ms`)
    }
  })

  test('failing attempt (invalid code for existing user) takes at least 500ms', async ({
    assert,
  }) => {
    const user = await User.create({ username: 'testuser', password: 'password123' })
    await user.generateNewRecoveryCode()
    await user.save()

    const start = performance.now()

    try {
      await User.verifyRecoveryCode('testuser', 'WRON-GCOD-E123-4567')
      assert.fail('Should have thrown E_INVALID_CREDENTIALS')
    } catch (error) {
      const duration = performance.now() - start
      assert.equal(error.code, 'E_INVALID_CREDENTIALS')
      assert.isAtLeast(duration, 980, `Execution took ${duration}ms, expected >= 980ms`)
    }
  })

  test('successful verification executes returnEarly() without artificial delay', async ({
    assert,
  }) => {
    const user = await User.create({ username: 'validuser', password: 'password123' })
    const rawCode = await user.generateNewRecoveryCode()
    await user.save()

    const verifiedUser = await User.verifyRecoveryCode('validuser', rawCode)
    assert.equal(verifiedUser.id, user.id)
  })
})
