import vine from '@vinejs/vine'

export const createGenreValidator = vine.withMetaData<{ categoryId: number }>().compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .unique(async (db, value, field) => {
        const genreIsUnique = await db
          .from('genres')
          .where('name', value)
          .andWhere('category_id', '=', field.meta.categoryId)
          .first()
        return !genreIsUnique
      }),
    categoryId: vine.number().isExists({ table: 'media_categories', column: 'id' }),
  })
)

export const updateGenreValidator = vine.withMetaData<{ categoryId: number }>().compile(
  vine.object({
    // params
    params: vine.object({
      genreId: vine.number().isExists({ table: 'genres', column: 'id' }),
    }),
    // body
    name: vine
      .string()
      .trim()
      .unique(async (db, value, field) => {
        const genreIsUnique = await db
          .from('genres')
          .where('name', value)
          .andWhere('category_id', '=', field.meta.categoryId)
          .first()
        return !genreIsUnique
      }),
    categoryId: vine.number().isExists({ table: 'media_categories', column: 'id' }),
  })
)

export const deleteGenreValidator = vine.compile(
  vine.object({
    params: vine.object({
      genreId: vine.number().isExists({ table: 'genres', column: 'id' }),
    }),
  })
)
