import { validCoverFileExtension } from '#enums/FileExtension'
import { validSeasonTypes } from '#enums/MediaTypes'
import { validReviewStatus } from '#enums/ReviewStatus'
import vine from '@vinejs/vine'

export const createSeasonValidator = vine.compile(
  vine.object({
    mediaParentId: vine.number().nullable(),
    type: vine.enum(validSeasonTypes),
    cover: vine
      .file({
        size: '2mb',
        extnames: validCoverFileExtension,
      })
      .nullable(),
    name: vine.string().trim(),
    released: vine.string().trim(),
    synopsis: vine.string().trim(),
    creator: vine.string().trim(),
    length: vine.number().positive(),
    // //review
    status: vine.enum(validReviewStatus),
    rating: vine.number().range([0, 10]).nullable(),
    opinion: vine.string().trim().nullable(),
    isFavorite: vine.boolean(),
  })
)

export const updateSeasonValidator = vine.compile(
  vine.object({
    mediaParentId: vine.number().nullable(),
    type: vine.enum(validSeasonTypes),
    name: vine.string().trim(),
    released: vine.string().trim(),
    synopsis: vine.string().trim(),
    creator: vine.string().trim(),
    length: vine.number().positive(),
  })
)
