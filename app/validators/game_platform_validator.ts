import vine from '@vinejs/vine'

export const createGamePlatformValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const platformIsUnique = await db.from('game_platforms').where('name', value).first()
        return !platformIsUnique
      }),
  })
)

export const updateGamePlatformValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const platformIsUnique = await db.from('game_platforms').where('name', value).first()
        return !platformIsUnique
      }),
  })
)
