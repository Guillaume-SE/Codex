import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'
import { validMediaTypes } from 'App/Tools/Enums/MediaTypes'

export default class UpdateBookValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    mediaParentId: schema.number.nullable(),
    type: schema.enum(validMediaTypes, [rules.trim()]),
    name: schema.string([rules.trim()]),
    released: schema.string([rules.trim()]),
    synopsis: schema.string([rules.trim()]),
    author: schema.string([rules.trim()]),
    illustrator: schema.string.nullable([rules.trim()]),
    editor: schema.string([rules.trim()]),
    pages: schema.number([rules.unsigned()]),
  })

  public messages: CustomMessages = {}
}
