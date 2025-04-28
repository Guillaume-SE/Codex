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
    // params
    params: vine.object({
      platformId: vine.number().isExists({ table: 'game_platforms', column: 'id' }),
    }),
    // body
    name: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const gamePlatformIsUnique = await db.from('game_platforms').where('name', value).first()
        return !gamePlatformIsUnique
      }),
  })
)

export const platformValidator = vine.compile(
  vine.object({
    params: vine.object({
      platformId: vine.number().isExists({ table: 'game_platforms', column: 'id' }),
    }),
  })
)
