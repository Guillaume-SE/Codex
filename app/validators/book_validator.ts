import { validCoverFileExtension } from '#enums/FileExtension'
import { validBookTypes } from '#enums/MediaTypes'
import { validReviewStatus } from '#enums/ReviewStatus'
import vine from '@vinejs/vine'

export const createBookValidator = vine.compile(
  vine.object({
    mediaParentId: vine.number().nullable(),
    type: vine.enum(validBookTypes),
    cover: vine.file({
      size: '2mb',
      extnames: validCoverFileExtension,
    }),
    name: vine.string().trim(),
    released: vine.string().trim(),
    synopsis: vine.string().trim(),
    author: vine.string().trim(),
    illustrator: vine.string().trim().nullable(),
    editor: vine.string().trim(),
    pages: vine.number().positive(),
    // //review
    status: vine.enum(validReviewStatus),
    rating: vine.number().range([0, 10]).nullable(),
    opinion: vine.string().trim().nullable(),
    isFavorite: vine.boolean(),
  })
)

export const updateBookValidator = vine.compile(
  vine.object({
    mediaParentId: vine.number().nullable(),
    type: vine.enum(validBookTypes),
    name: vine.string().trim(),
    released: vine.string().trim(),
    synopsis: vine.string().trim(),
    author: vine.string().trim(),
    illustrator: vine.string().trim().nullable(),
    editor: vine.string().trim(),
    pages: vine.number().positive(),
  })
)
