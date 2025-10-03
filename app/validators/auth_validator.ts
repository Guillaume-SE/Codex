import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    uid: vine.string().trim(),
    password: vine.string(),
    remember: vine.boolean(),
  })
)
// export const emailRule = vine.string().maxLength(254).email().toLowerCase().trim()

// export const newEmailRule = emailRule.clone().unique(async (db, value) => {
//   const exists = await db.from('users').where('email', value).select('id').first()
//   return !exists
// })
