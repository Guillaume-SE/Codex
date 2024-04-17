import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  public async show({ params }: HttpContext) {
    return `Return the user with id ${params.id}`
  }
}
