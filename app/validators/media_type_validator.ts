import vine from '@vinejs/vine'

export const createMediaTypeValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    categoryId: vine.number().positive(),
  })
)

export const updateMediaTypeValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
  })
)
