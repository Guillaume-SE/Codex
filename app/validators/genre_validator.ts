import vine from '@vinejs/vine'

export const createGenreValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .toLowerCase()
      .unique(async (db, value) => {
        const genreIsUnique = await db.from('genres').where('name', value).first()
        return !genreIsUnique
      }),
  })
)

export const updateGenreValidator = vine.compile(
  vine.object({
    params: vine.object({
      genreId: vine.number().isExists({ table: 'genres', column: 'id' }),
    }),
    name: vine
      .string()
      .trim()
      .toLowerCase()
      .unique(async (db, value) => {
        const genreIsUnique = await db.from('genres').where('name', value).first()
        return !genreIsUnique
      }),
  })
)

export const genreValidator = vine.compile(
  vine.object({
    params: vine.object({
      genreId: vine.number().isExists({ table: 'genres', column: 'id' }),
    }),
  })
)
