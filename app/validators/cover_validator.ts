import vine from '@vinejs/vine'

export const manageCoverValidator = vine.compile(
  vine.object({
    cover: vine.file({
      size: '2mb',
      extnames: ['png', 'webp', 'jpg', 'jpeg', 'avif'],
    }),
    params: vine.object({
      mediaId: vine.number().isExists({ table: 'media', column: 'id' }),
    }),
  })
)

export const deleteCoverValidator = vine.compile(
  vine.object({
    params: vine.object({
      mediaId: vine.number().isExists({ table: 'media', column: 'id' }),
    }),
  })
)

export const mediaCoverValidator = vine.compile(
  vine.object({
    params: vine.object({
      mediaId: vine.number().isExists({ table: 'media', column: 'id' }),
    }),
  })
)
