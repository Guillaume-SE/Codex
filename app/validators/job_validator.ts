import vine from '@vinejs/vine'

export const manageJobValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
  })
)
