import User from '#models/user'
import { createUserValidator } from '#validators/user'
import { GoogleUser } from '../types/user.js'

export class UserService {
  static async findOrCreateUser(googleUser: GoogleUser) {
    const user = await createUserValidator.validate(googleUser)
    return User.firstOrCreate(
      { googleId: user.id },
      {
        fullName: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        username: user.email.split('@')[0],
      }
    )
  }
}
