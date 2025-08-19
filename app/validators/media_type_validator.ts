import vine from '@vinejs/vine'

export const createMediaTypeValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const match = await db.from('media_types').where('name', value).first()
        return !match
      }),
  })
)

export const updateMediaTypeValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .unique(async (db, value, field) => {
        const typeId = field.meta.params.typeId
        const match = await db
          .from('media_types')
          .where('name', value)
          .whereNot('id', typeId)
          .first()
        return !match
      }),
  })
)

export const replaceMediaTypeValidator = vine.compile(
  vine.object({
    replacementTypeId: vine.number().isExists({ table: 'media_types', column: 'id' }),
  })
)
