import vine from '@vinejs/vine'

export const coverValidator = vine.compile(
  vine.object({
    cover: vine.file({
      size: '5mb',
      extnames: ['png', 'webp', 'jpg', 'jpeg', 'avif'],
    }),
  })
)
