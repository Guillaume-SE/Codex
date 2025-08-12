import vine from '@vinejs/vine'

export const createMediaTypeValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const typeIsUnique = await db.from('media_types').where('name', value).first()
        return !typeIsUnique
      }),
  })
)

export const updateMediaTypeValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const typeIsUnique = await db.from('media_types').where('name', value).first()
        return !typeIsUnique
      }),
  })
)

export const replaceMediaTypeValidator = vine.compile(
  vine.object({
    replacementTypeId: vine.number().isExists({ table: 'media_types', column: 'id' }),
  })
)
