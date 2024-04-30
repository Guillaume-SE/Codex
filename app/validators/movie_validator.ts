import { validCoverFileExtension } from '#enums/FileExtension'
import { validMovieTypes } from '#enums/MediaTypes'
import { validReviewStatus } from '#enums/ReviewStatus'
import vine from '@vinejs/vine'

export const createMovieValidator = vine.compile(
  vine.object({
    mediaParentId: vine.number().nullable(),
    type: vine.enum(validMovieTypes),
    cover: vine
      .file({
        size: '2mb',
        extnames: validCoverFileExtension,
      })
      .nullable(),
    name: vine.string().trim(),
    released: vine.string().trim(),
    synopsis: vine.string().trim(),
    director: vine.string().trim(),
    screenwriter: vine.string().trim(),
    duration: vine.number().positive(),
    // //review
    status: vine.enum(validReviewStatus),
    rating: vine.number().range([0, 10]).nullable(),
    opinion: vine.string().trim().nullable(),
    isFavorite: vine.boolean(),
  })
)

export const updateMovieValidator = vine.compile(
  vine.object({
    mediaParentId: vine.number().nullable(),
    type: vine.enum(validMovieTypes),
    name: vine.string().trim(),
    released: vine.string().trim(),
    synopsis: vine.string().trim(),
    director: vine.string().trim(),
    screenwriter: vine.string().trim(),
    duration: vine.number().positive(),
  })
)
