import vine from '@vinejs/vine'

export const typesAndGenresAssociationValidator = vine.compile(
  vine.object({
    params: vine.object({
      categoryId: vine.number().isExists({ table: 'media_categories', column: 'id' }),
    }),
    types: vine.array(vine.number().isExists({ table: 'media_types', column: 'id' })).distinct(),
    genres: vine.array(vine.number().isExists({ table: 'genres', column: 'id' })).distinct(),
  })
)
