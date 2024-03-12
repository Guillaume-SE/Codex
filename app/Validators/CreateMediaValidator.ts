import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { validMediaTypes } from 'App/Tools/Enums/MediaTypes'
import { validGamePlatform } from 'App/Tools/Enums/GamePlatform'
import { validCoverFileExtension } from 'App/Tools/Enums/FileExtension'
import { validReviewStatus } from 'App/Tools/Enums/ReviewStatus'

export default class CreateMediaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    // for books type
    author: schema.string.optional([rules.trim()]),
    illustrator: schema.string.optional([rules.trim()]),
    editor: schema.string.optional([rules.trim()]),
    pages: schema.number.optional([rules.unsigned()]),
    // for seasons type
    creator: schema.string.optional([rules.trim()]),
    length: schema.number.optional([rules.unsigned()]),
    //for review
    status: schema.enum(validReviewStatus, [rules.trim()]),
    rating: schema.number.nullable([rules.range(0, 10)]),
    opinion: schema.string.nullable([rules.trim()]),
    isFavorite: schema.boolean(),
  })

  public messages: CustomMessages = {}
}
