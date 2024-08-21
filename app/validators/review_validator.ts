import vine from '@vinejs/vine'

export const createReviewValidator = vine.compile(
  vine.object({
    rating: vine.number().range([0, 10]).nullable(),
    opinion: vine.string().trim().nullable(),
    isFavorite: vine.boolean(),
  })
)

export const updateReviewValidator = vine.compile(
  vine.object({
    rating: vine.number().range([0, 10]).nullable(),
    opinion: vine.string().trim().nullable(),
    isFavorite: vine.boolean(),
  })
)
