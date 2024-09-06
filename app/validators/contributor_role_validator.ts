import vine from '@vinejs/vine'

export const manageContributorRoleValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
  })
)
