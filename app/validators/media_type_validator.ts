import vine from '@vinejs/vine'

export const createMediaTypeValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .toLowerCase()
      .unique(async (db, value) => {
        const typeIsUnique = await db.from('media_types').where('name', value).first()
        return !typeIsUnique
      }),
  })
)

export const updateMediaTypeValidator = vine.compile(
  vine.object({
    // params
    params: vine.object({
      typeId: vine.number().isExists({ table: 'media_types', column: 'id' }),
    }),
    // body
    name: vine
      .string()
      .trim()
      .toLowerCase()
      .unique(async (db, value) => {
        const typeIsUnique = await db.from('media_types').where('name', value).first()
        return !typeIsUnique
      }),
  })
)

export const replaceMediaTypeValidator = vine.compile(
  vine.object({
    params: vine.object({
      typeId: vine.number().isExists({ table: 'media_types', column: 'id' }),
    }),
    newTypeId: vine.number().isExists({ table: 'media_types', column: 'id' }),
  })
)

export const singleMediaTypeValidator = vine.compile(
  vine.object({
    params: vine.object({
      typeId: vine.number().isExists({ table: 'media_types', column: 'id' }),
    }),
  })
)
