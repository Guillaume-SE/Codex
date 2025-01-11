import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class DashboardController {
  async showDashboard({ inertia }: HttpContext) {
    return inertia.render('admin/Dashboard')
  }
}
