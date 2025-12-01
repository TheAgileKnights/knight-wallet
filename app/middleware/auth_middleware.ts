import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/auth/login'
  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    // Store the intended URL in session before redirecting to login
    const isAuthenticated = await ctx.auth.check()
    if (!isAuthenticated) {
      ctx.session.put('intended_url', ctx.request.url())
    }

    await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo })
    return next()
  }
}
