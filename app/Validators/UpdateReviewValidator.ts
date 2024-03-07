import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { validReviewStatus } from 'App/Tools/Enums/ReviewStatus'

export default class UpdateReviewValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    status: schema.enum(validReviewStatus, [rules.trim()]),
    rating: schema.number.nullable([rules.range(0, 10)]),
    opinion: schema.string.nullable([rules.trim()]),
    isFavorite: schema.boolean(),
  })

  public messages: CustomMessages = {}
}
