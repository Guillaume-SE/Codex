import vine from '@vinejs/vine'

export const createGenreValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    categoryId: vine.number().positive(),
  })
)

export const updateGenreValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
  })
)
