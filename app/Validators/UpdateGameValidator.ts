import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'
import { validGamePlatform } from 'App/Tools/Enums/GamePlatform'
import { validMediaTypes } from 'App/Tools/Enums/MediaTypes'

export default class UpdateGameValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    mediaParentId: schema.number.nullable(),
    type: schema.enum(validMediaTypes, [rules.trim()]),
    name: schema.string([rules.trim()]),
    released: schema.string([rules.trim()]),
    synopsis: schema.string([rules.trim()]),
    developer: schema.string([rules.trim()]),
    publisher: schema.string([rules.trim()]),
    platform: schema.enum(validGamePlatform, [rules.trim()]),
  })

  public messages: CustomMessages = {}
}
