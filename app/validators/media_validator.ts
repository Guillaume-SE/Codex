import { validCoverFileExtension } from '#enums/FileExtension'
import { validReviewStatus } from '#enums/ReviewStatus'
import vine from '@vinejs/vine'

export const createMediaValidator = vine.compile(
  vine.object({
    mediaParentId: vine.number().positive().nullable(),
    categoryId: vine.number().positive(),
    typeId: vine.number().positive(),
    cover: vine
      .file({
        size: '2mb',
        extnames: validCoverFileExtension,
      })
      .nullable(),
    name: vine.string().trim(),
    released: vine.string().trim(),
    synopsis: vine.string().trim(),
    // books
    author: vine.string().trim().optional(),
    illustrator: vine.string().trim().nullable().optional(),
    editor: vine.string().trim().optional(),
    pages: vine.number().positive().optional(),
    // games
    developer: vine.string().trim().optional(),
    publisher: vine.string().trim().optional(),
    platform: vine.number().positive().optional(),
    // movies
    director: vine.string().trim().optional(),
    screenwriter: vine.string().trim().optional(),
    duration: vine.number().positive().optional(),
    // seasons
    creator: vine.string().trim().optional(),
    length: vine.number().positive().optional(),
    // //review
    status: vine.enum(validReviewStatus),
    rating: vine.number().range([0, 10]).nullable(),
    opinion: vine.string().trim().nullable(),
    isFavorite: vine.boolean(),
  })
)
