import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

export default class CreateMediaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    // for books type
    author: schema.string.optional([rules.trim()]),
    illustrator: schema.string.optional([rules.trim()]),
    editor: schema.string.optional([rules.trim()]),
    pages: schema.number.optional([rules.unsigned()]),
  })

  public messages: CustomMessages = {}
}
