import { validCoverFileExtension } from '#enums/FileExtension'
import vine from '@vinejs/vine'

export const updateCoverValidator = vine.compile(
  vine.object({
    cover: vine.file({
      size: '2mb',
      extnames: validCoverFileExtension,
    }),
  })
)
