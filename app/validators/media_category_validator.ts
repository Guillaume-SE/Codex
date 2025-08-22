import vine from '@vinejs/vine'

export const categoryAssociationValidator = vine.compile(
  vine.object({
    types: vine.array(vine.number().isExists({ table: 'media_types', column: 'id' })).distinct(),
    genres: vine.array(vine.number().isExists({ table: 'genres', column: 'id' })).distinct(),
  })
)
