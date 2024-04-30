import { validReviewStatus } from '#enums/ReviewStatus'
import vine from '@vinejs/vine'

export const updateReviewValidator = vine.compile(
  vine.object({
    status: vine.enum(validReviewStatus),
    rating: vine.number().range([0, 10]).nullable(),
    opinion: vine.string().trim().nullable(),
    isFavorite: vine.boolean(),
  })
)
