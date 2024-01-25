import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { validMediaTypes } from 'App/Tools/Enums/MediaTypes'
import { validGamePlatform } from 'App/Tools/Enums/GamePlatform'
import { validCoverFileExtension } from 'App/Tools/Enums/FileExtension'

export default class CreateMediaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    mediaParentId: schema.number.nullable(),
    type: schema.enum(validMediaTypes, [rules.trim()]),
    cover: schema.file.nullable({
      size: '2mb',
      extnames: validCoverFileExtension,
    }),
    name: schema.string([rules.trim()]),
    released: schema.string([rules.trim()]),
    synopsis: schema.string([rules.trim()]),
    // for games type
    developer: schema.string.optional([rules.trim()]),
    publisher: schema.string.optional([rules.trim()]),
    plateform: schema.enum.optional(validGamePlatform, [rules.trim()]),
    // for movies type
    director: schema.string.optional([rules.trim()]),
    screenwriter: schema.string.optional([rules.trim()]),
    duration: schema.number.optional([rules.unsigned()]),
    // for books type
    author: schema.string.optional([rules.trim()]),
    illustrator: schema.string.optional([rules.trim()]),
    editor: schema.string.optional([rules.trim()]),
    pages: schema.number.optional([rules.unsigned()]),
    // for seasons type
    creator: schema.string.optional([rules.trim()]),
    length: schema.number.optional([rules.unsigned()]),
  })

  public messages: CustomMessages = {}
}
