import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { validMediaTypes } from 'App/Tools/Enums/MediaTypes'

export default class UpdateMovieValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    mediaParentId: schema.number.nullable(),
    type: schema.enum(validMediaTypes, [rules.trim()]),
    name: schema.string([rules.trim()]),
    released: schema.string([rules.trim()]),
    synopsis: schema.string([rules.trim()]),
    director: schema.string([rules.trim()]),
    screenwriter: schema.string([rules.trim()]),
    duration: schema.number([rules.unsigned()]),
  })

  public messages: CustomMessages = {}
}
