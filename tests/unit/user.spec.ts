import { test } from '@japa/runner'
import User from '#models/user'

test.group('User Model', () => {
  test('user can be created with email and full name', ({ assert }) => {
    const user = new User()
    user.email = 'test@example.com'
    user.fullName = 'Test User'

    assert.equal(user.email, 'test@example.com')
    assert.equal(user.fullName, 'Test User')
  })

  test('user has default undefined values for optional fields', ({ assert }) => {
    const user = new User()

    assert.isUndefined(user.username)
    assert.isUndefined(user.avatarUrl)
    assert.isUndefined(user.googleId)
  })
})
