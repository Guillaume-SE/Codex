import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { validCoverFileExtension } from 'App/Tools/Enums/FileExtension'

export default class UpdateCoverValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cover: schema.file({
      size: '2mb',
      extnames: validCoverFileExtension,
    }),
  })

  public messages: CustomMessages = {}
}
