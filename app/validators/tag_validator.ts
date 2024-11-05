import vine from '@vinejs/vine'

export const createTagValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const tagIsUnique = await db.from('tags').where('name', value).first()
        return !tagIsUnique
      }),
  })
)

export const updateTagValidator = vine.compile(
  vine.object({
    // params
    params: vine.object({
      tagId: vine.number().isExists({ table: 'tags', column: 'id' }),
    }),
    // body
    name: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const tagIsUnique = await db.from('tags').where('name', value).first()
        return !tagIsUnique
      }),
  })
)

export const deleteTagValidator = vine.compile(
  vine.object({
    params: vine.object({
      tagId: vine.number().isExists({ table: 'tags', column: 'id' }),
    }),
  })
)
