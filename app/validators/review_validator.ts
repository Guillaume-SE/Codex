import vine from '@vinejs/vine'

export const manageReviewValidator = vine.compile(
  vine.object({
    // params
    params: vine.object({
      mediaId: vine.number().isExists({ table: 'media', column: 'id' }),
    }),
    rating: vine.number().range([0, 10]).nullable(),
    opinion: vine.string().trim().nullable(),
    isFavorite: vine.boolean(),
  })
)
