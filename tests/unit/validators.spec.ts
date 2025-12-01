import { test } from '@japa/runner'
import { createUserValidator } from '#validators/user'

test.group('User Validator', () => {
  test('validates a correct user object', async ({ assert }) => {
    const validData = {
      id: '123',
      email: 'test@example.com',
      name: 'John Doe',
      avatarUrl: 'https://example.com/avatar.jpg',
    }

    const result = await createUserValidator.validate(validData)

    assert.equal(result.email, 'test@example.com')
    assert.equal(result.name, 'John Doe')
  })

  test('rejects invalid email', async ({ assert }) => {
    const invalidData = {
      id: '123',
      email: 'not-an-email',
      name: 'John Doe',
      avatarUrl: 'https://example.com/avatar.jpg',
    }

    await assert.rejects(async () => await createUserValidator.validate(invalidData))
  })

  test('rejects short name', async ({ assert }) => {
    const invalidData = {
      id: '123',
      email: 'test@example.com',
      name: 'Jo',
      avatarUrl: 'https://example.com/avatar.jpg',
    }

    await assert.rejects(async () => await createUserValidator.validate(invalidData))
  })
})
