import vine from '@vinejs/vine'

export const createMediaTypeValidator = vine.withMetaData<{ categoryId: number }>().compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .unique(async (db, value, field) => {
        const typeIsUnique = await db
          .from('media_types')
          .where('name', value)
          .andWhere('category_id', '=', field.meta.categoryId)
          .first()
        return !typeIsUnique
      }),
    categoryId: vine.number().isExists({ table: 'media_categories', column: 'id' }),
  })
)

export const updateMediaTypeValidator = vine.withMetaData<{ categoryId: number }>().compile(
  vine.object({
    // params
    params: vine.object({
      typeId: vine.number().isExists({ table: 'media_types', column: 'id' }),
    }),
    // body
    name: vine
      .string()
      .trim()
      .unique(async (db, value, field) => {
        const typeIsUnique = await db
          .from('media_types')
          .where('name', value)
          .andWhere('category_id', '=', field.meta.categoryId)
          .first()
        return !typeIsUnique
      }),
    categoryId: vine.number().isExists({ table: 'media_categories', column: 'id' }),
  })
)
