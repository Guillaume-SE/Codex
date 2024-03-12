import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { validCoverFileExtension } from 'App/Tools/Enums/FileExtension'
import { validMediaTypes } from 'App/Tools/Enums/MediaTypes'
import { validReviewStatus } from 'App/Tools/Enums/ReviewStatus'
import { validGamePlatform } from 'App/Tools/Enums/GamePlatform'

export default class CreateGameValidator {
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
    developer: schema.string([rules.trim()]),
    publisher: schema.string([rules.trim()]),
    platform: schema.enum(validGamePlatform, [rules.trim()]),
    //review
    status: schema.enum(validReviewStatus, [rules.trim()]),
    rating: schema.number.nullable([rules.range(0, 10)]),
    opinion: schema.string.nullable([rules.trim()]),
    isFavorite: schema.boolean(),
  })

  public messages: CustomMessages = {}
}
