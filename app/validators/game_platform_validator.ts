import vine from '@vinejs/vine'

export const createGamePlatformValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const match = await db.from('game_platforms').where('name', value).first()
        return !match
      }),
  })
)

export const updateGamePlatformValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .unique(async (db, value, field) => {
        const platformId = field.meta.params.platformId
        const match = await db
          .from('game_platforms')
          .where('name', value)
          .whereNot('id', platformId)
          .first()
        return !match
      }),
  })
)
