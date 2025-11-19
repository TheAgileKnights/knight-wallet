import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async index(ctx: HttpContext) {
    return ctx.inertia.render('application/dashboard', { user: ctx.auth.user?.serialize() })
  }
}
