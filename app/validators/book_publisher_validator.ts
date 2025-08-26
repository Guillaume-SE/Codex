import vine from '@vinejs/vine'

export const createBookPublisherValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const match = await db.from('book_publishers').where('name', value).first()
        return !match
      }),
  })
)

export const updateBookPublisherValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .unique(async (db, value, field) => {
        const publisherId = field.meta.params.publisherId
        const match = await db
          .from('book_publishers')
          .where('name', value)
          .whereNot('id', publisherId)
          .first()
        return !match
      }),
  })
)
