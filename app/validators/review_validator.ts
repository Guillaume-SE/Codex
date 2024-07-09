import vine from '@vinejs/vine'

export const createReviewValidator = vine.compile(
  vine.object({
    statusId: vine.number().positive(),
    rating: vine.number().range([0, 10]).nullable(),
    opinion: vine.string().trim().nullable(),
    isFavorite: vine.boolean(),
  })
)
