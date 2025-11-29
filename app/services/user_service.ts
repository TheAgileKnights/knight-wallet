import User from '#models/user'
import { createUserValidator } from '#validators/user'
import { GoogleUser } from '../types/user.js'
import type { HttpContext } from '@adonisjs/core/http'

export class UserService {
  static async findOrCreateUserFromGoogle(googleUser: GoogleUser) {
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
  static async loginUser(user: User, ctx: HttpContext) {
    await ctx.auth.use('web').login(user)
    ctx.session.flash('success', 'You are now logged in.')
    return ctx.response.redirect().toRoute('app.index')
  }
  static async registerAndLoginGoogleUser(googleUser: GoogleUser, ctx: HttpContext) {
    const user = await this.findOrCreateUserFromGoogle(googleUser)
    return this.loginUser(user, ctx)
  }
  static async registerAndLoginFakeUser(ctx: HttpContext) {
    const fakeUser: GoogleUser = {
      id: 'fake-google-id',
      name: 'Fake User',
      email: 'fakeuser@example.com',
      avatarUrl: 'https://www.w3schools.com/howto/img_avatar.png',
    }
    return this.registerAndLoginGoogleUser(fakeUser, ctx)
  }
}
