import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async showHome({ view }: HttpContext) {
    return view.render('pages/home')
  }
}
