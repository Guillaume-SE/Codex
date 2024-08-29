import vine from '@vinejs/vine'

export const manageMediaCategoryValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
  })
)
