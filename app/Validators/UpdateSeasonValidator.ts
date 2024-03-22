import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'
import { validMediaTypes } from 'App/Tools/Enums/MediaTypes'

export default class UpdateSeasonValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    mediaParentId: schema.number.nullable(),
    type: schema.enum(validMediaTypes, [rules.trim()]),
    name: schema.string([rules.trim()]),
    released: schema.string([rules.trim()]),
    synopsis: schema.string([rules.trim()]),
    creator: schema.string([rules.trim()]),
    length: schema.number([rules.unsigned()]),
  })

  public messages: CustomMessages = {}
}
