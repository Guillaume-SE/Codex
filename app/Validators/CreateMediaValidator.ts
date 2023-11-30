import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateMediaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    mediaParentId: schema.number.nullable(),
    type: schema.string([rules.trim()]),
    cover: schema.file.nullable(),
    name: schema.string([rules.trim()]),
    released: schema.string([rules.trim()]),
    synopsis: schema.string([rules.trim()]),
  })

  public messages: CustomMessages = {}
}
