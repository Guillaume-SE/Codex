import vine from '@vinejs/vine'

export const reviewValidator = vine.compile(
  vine.object({
    rating: vine.number().range([0, 10]).nullable(),
    opinion: vine.string().trim().nullable(),
    isFavorite: vine.boolean(),
  })
)
