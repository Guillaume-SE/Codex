import vine from '@vinejs/vine'

export const createContributorRoleValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const roleIsUnique = await db.from('contributors_roles').where('name', value).first()
        return !roleIsUnique
      }),
  })
)

export const updateContributorRoleValidator = vine.compile(
  vine.object({
    // params
    params: vine.object({
      roleId: vine.number().isExists({ table: 'contributors_roles', column: 'id' }),
    }),
    // body
    name: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const roleIsUnique = await db.from('contributors_roles').where('name', value).first()
        return !roleIsUnique
      }),
  })
)

export const deleteContributorRoleValidator = vine.compile(
  vine.object({
    // params
    params: vine.object({
      roleId: vine.number().isExists({ table: 'contributors_roles', column: 'id' }),
    }),
  })
)
