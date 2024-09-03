import vine from '@vinejs/vine'

export const manageGamePlatformValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
  })
)
