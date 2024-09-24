import vine from '@vinejs/vine'

export const manageCoverValidator = vine.compile(
  vine.object({
    cover: vine.file({
      size: '2mb',
      extnames: ['png', 'webp', 'jpg', 'jpeg'],
    }),
    params: vine.object({
      mediaId: vine.number().exists(async (db, value) => {
        const mediaExist = await db.from('media').where('id', value).first()
        return !!mediaExist
      }),
    }),
  })
)

export const deleteCoverValidator = vine.compile(
  vine.object({
    params: vine.object({
      mediaId: vine.number().exists(async (db, value) => {
        const mediaExist = await db.from('media').where('id', value).first()
        return !!mediaExist
      }),
    }),
  })
)
