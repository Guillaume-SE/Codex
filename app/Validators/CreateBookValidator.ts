import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'
import { validCoverFileExtension } from 'App/Tools/Enums/FileExtension'
import { validMediaTypes } from 'App/Tools/Enums/MediaTypes'
import { validReviewStatus } from 'App/Tools/Enums/ReviewStatus'

export default class CreateBookValidator {
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
    author: schema.string([rules.trim()]),
    illustrator: schema.string.nullable([rules.trim()]),
    editor: schema.string([rules.trim()]),
    pages: schema.number([rules.unsigned()]),
    //review
    status: schema.enum(validReviewStatus, [rules.trim()]),
    rating: schema.number.nullable([rules.range(0, 10)]),
    opinion: schema.string.nullable([rules.trim()]),
    isFavorite: schema.boolean(),
  })

  public messages: CustomMessages = {}
}
