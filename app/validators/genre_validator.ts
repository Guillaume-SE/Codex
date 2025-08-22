import vine from '@vinejs/vine'

export const createGenreValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const match = await db.from('genres').where('name', value).first()
        return !match
      }),
  })
)

export const updateGenreValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .unique(async (db, value, field) => {
        const genreId = field.meta.params.genreId
        const match = await db.from('genres').where('name', value).whereNot('id', genreId).first()
        return !match
      }),
  })
)
