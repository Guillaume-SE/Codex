import vine from '@vinejs/vine'

export const manageMediaStatusValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
  })
)
