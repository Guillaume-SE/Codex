import { validCoverFileExtension } from '#enums/FileExtension'
import { validGamePlatform } from '#enums/GamePlatform'
import { validGameTypes } from '#enums/MediaTypes'
import { validReviewStatus } from '#enums/ReviewStatus'
import vine from '@vinejs/vine'

export const createGameValidator = vine.compile(
  vine.object({
    mediaParentId: vine.number().nullable(),
    type: vine.enum(validGameTypes),
    cover: vine
      .file({
        size: '2mb',
        extnames: validCoverFileExtension,
      })
      .nullable(),
    name: vine.string().trim(),
    released: vine.string().trim(),
    synopsis: vine.string().trim(),
    developer: vine.string().trim(),
    publisher: vine.string().trim(),
    platform: vine.enum(validGamePlatform),
    // //review
    status: vine.enum(validReviewStatus),
    rating: vine.number().range([0, 10]).nullable(),
    opinion: vine.string().trim().nullable(),
    isFavorite: vine.boolean(),
  })
)

export const updateGameValidator = vine.compile(
  vine.object({
    mediaParentId: vine.number().nullable(),
    type: vine.enum(validGameTypes),
    name: vine.string().trim(),
    released: vine.string().trim(),
    synopsis: vine.string().trim(),
    developer: vine.string().trim(),
    publisher: vine.string().trim(),
    platform: vine.enum(validGamePlatform),
  })
)
