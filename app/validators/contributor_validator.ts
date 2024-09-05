import vine from '@vinejs/vine'

export const manageContributorValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
  })
)
