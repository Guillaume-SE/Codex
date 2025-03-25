import vine from '@vinejs/vine'

export const searchValidator = vine.compile(
  vine.object({
    search: vine.string().trim().escape().optional(),
  })
)
