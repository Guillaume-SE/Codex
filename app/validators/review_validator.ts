import vine from '@vinejs/vine'

export const reviewValidator = vine.compile(
  vine.object({
    rating: vine.number().range([0, 10]).nullable(),
    isFavorite: vine.boolean(),
  })
)
