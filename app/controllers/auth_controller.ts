import type { HttpContext } from '@adonisjs/core/http'
import { UserService } from '#services/user_service'
import { GoogleUser } from '../types/user.js'

export default class AuthController {
  async login({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async logout({ auth, response, session }: HttpContext) {
    await auth.use('web').logout()
    session.flash('success', 'You have been logged out.')
    return response.redirect().toRoute('auth.login')
  }

  async googleRedirect(ctx: HttpContext) {
    if (process.env.FAKE_LOGIN === 'true') {
      return UserService.registerAndLoginFakeUser(ctx)
    }
    return ctx.ally.use('google').redirect()
  }

  async googleCallback(ctx: HttpContext) {
    const google = ctx.ally.use('google')

    if (google.accessDenied()) {
      ctx.session.flash('error', 'You must allow access to your Google account to log in.')
      return ctx.response.redirect().toRoute('auth.login')
    }

    if (google.stateMisMatch()) {
      ctx.session.flash('error', 'Invalid state parameter. Please try logging in again.')
      return ctx.response.redirect().toRoute('auth.login')
    }

    if (google.hasError()) {
      ctx.session.flash(
        'error',
        google.getError() || 'Something went wrong during Google login. Please try again.'
      )
      return ctx.response.redirect().toRoute('auth.login')
    }

    const googleUser: GoogleUser = await google.user()
    return UserService.registerAndLoginGoogleUser(googleUser, ctx)
  }
}
