import vine from '@vinejs/vine'

export const coverValidator = vine.compile(
  vine.object({
    cover: vine.file({
      size: '2mb',
      extnames: ['png', 'webp', 'jpg', 'jpeg', 'avif'],
    }),
  })
)
