import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const createMediaValidator = vine.compile(
  vine.object({
    categoryId: vine.number().isExists({ table: 'media_categories', column: 'id' }),
    statusId: vine.number().isExists({ table: 'media_statuses', column: 'id' }),
    typeId: vine.number().isExists({ table: 'media_types', column: 'id' }),
    name: vine.string().trim(),
    alternativeName: vine.string().trim().nullable(),
    released: vine
      .date()
      .transform((value) => {
        if (value === undefined || !value) {
          return null
        }
        return DateTime.fromJSDate(value)
      })
      .nullable(),
    synopsis: vine.string().trim().nullable(),
    tagId: vine.number().isExists({ table: 'tags', column: 'id' }),
    genreId: vine.array(vine.number().isExists({ table: 'genres', column: 'id' })).distinct(),
    // specific infos
    platformId: vine
      .number()
      .isExists({ table: 'game_platforms', column: 'id' })
      .nullable()
      .optional(),
    pages: vine.number().positive().nullable().optional(),
    duration: vine.number().positive().nullable().optional(),
    animeSeasonLength: vine.number().positive().nullable().optional(),
    seriesSeasonLength: vine.number().positive().nullable().optional(),
  })
)

export const updateMediaValidator = vine.compile(
  vine.object({
    //params
    params: vine.object({
      mediaId: vine.number().isExists({ table: 'media', column: 'id' }),
    }),
    //body
    categoryId: vine.number().isExists({ table: 'media_categories', column: 'id' }),
    statusId: vine.number().isExists({ table: 'media_statuses', column: 'id' }),
    typeId: vine.number().isExists({ table: 'media_types', column: 'id' }),
    name: vine.string().trim(),
    alternativeName: vine.string().trim().nullable(),
    released: vine
      .date()
      .transform((value) => {
        if (value === undefined || !value) {
          return null
        }
        return DateTime.fromJSDate(value)
      })
      .nullable(),
    synopsis: vine.string().trim().nullable(),
    tagId: vine.number().isExists({ table: 'tags', column: 'id' }),
    genreId: vine.array(vine.number().isExists({ table: 'genres', column: 'id' })).distinct(),
    // specific infos
    platformId: vine
      .number()
      .isExists({ table: 'game_platforms', column: 'id' })
      .nullable()
      .optional(),
    pages: vine.number().positive().nullable().optional(),
    duration: vine.number().positive().nullable().optional(),
    animeSeasonLength: vine.number().positive().nullable().optional(),
    seriesSeasonLength: vine.number().positive().nullable().optional(),
  })
)

export const deleteMediaValidator = vine.compile(
  vine.object({
    params: vine.object({
      mediaId: vine.number().isExists({ table: 'media', column: 'id' }),
    }),
  })
)

export const showOneMediaValidator = vine.compile(
  vine.object({
    params: vine.object({
      mediaId: vine.number().isExists({ table: 'media', column: 'id' }),
    }),
  })
)

export const showByCategoryMediaValidator = vine.compile(
  vine.object({
    params: vine.object({
      categoryName: vine.string().isExists({ table: 'media_categories', column: 'name' }),
    }),
    search: vine.string().optional(),
    // status: vine
    //   .number()
    //   .exists(async (db, value) => {
    //     if (!value) {
    //       return true
    //     }
    //     const statusExists = await db.from('media_statuses').select('id').where('id', value).first()
    //     return !!statusExists
    //   })
    //   .optional(),
    status: vine
      .array(vine.number().isExists({ table: 'media_statuses', column: 'id' }))
      .optional(),
    types: vine.array(vine.number().isExists({ table: 'media_types', column: 'id' })).optional(),
    genres: vine.array(vine.number().isExists({ table: 'genres', column: 'id' })).optional(),
  })
)
