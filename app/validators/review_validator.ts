import vine from '@vinejs/vine'

export const manageReviewValidator = vine.compile(
  vine.object({
    rating: vine.number().range([0, 10]).nullable(),
    opinion: vine.string().trim().nullable(),
    isFavorite: vine.boolean(),
    params: vine.object({
      mediaId: vine.number().isExists({ table: 'media', column: 'id' }),
    }),
  })
)
