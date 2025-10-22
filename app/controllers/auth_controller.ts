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

  async googleRedirect({ ally }: HttpContext) {
    return ally.use('google').redirect()
  }

  async googleCallback({ ally, response, auth, session }: HttpContext) {
    const google = ally.use('google')

    if (google.accessDenied()) {
      session.flash('error', 'You must allow access to your Google account to log in.')
      return response.redirect().toRoute('auth.login')
    }

    if (google.stateMisMatch()) {
      session.flash('error', 'Invalid state parameter. Please try logging in again.')
      return response.redirect().toRoute('auth.login')
    }

    if (google.hasError()) {
      session.flash(
        'error',
        google.getError() || 'Something went wrong during Google login. Please try again.'
      )
      return response.redirect().toRoute('auth.login')
    }

    const user: GoogleUser = await google.user()

    const createdUser = await UserService.findOrCreateUser(user)

    await auth.use('web').login(createdUser)

    session.flash('success', 'You are now logged in.')

    return response.redirect().toRoute('dashboard')
  }
}
