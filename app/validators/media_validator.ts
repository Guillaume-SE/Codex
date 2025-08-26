import MediaService from '#services/media_service'
import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const mediaValidator = vine.compile(
  vine.object({
    categoryId: vine.number().isExists({ table: 'media_categories', column: 'id' }),
    statusId: vine.number().isExists({ table: 'media_statuses', column: 'id' }),
    typeId: vine.number().isExists({ table: 'media_types', column: 'id' }),
    name: vine.string().trim(),
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
    genreId: vine.array(vine.number().isExists({ table: 'genres', column: 'id' })).distinct(),
    // specific infos
    platformId: vine
      .number()
      .isExists({ table: 'game_platforms', column: 'id' })
      .nullable()
      .optional(),
    // .requiredWhen((field) => field.parent.categoryId === MediaCategoriesEnum.GAME)
    duration: vine.number().positive().nullable().optional(),
    // .requiredWhen((field) => field.parent.categoryId === MediaCategoriesEnum.MOVIE)
    seriesSeasonLength: vine.number().positive().nullable().optional(),
    // .requiredWhen((field) => field.parent.categoryId === MediaCategoriesEnum.SERIES)
    animeSeasonLength: vine.number().positive().nullable().optional(),
    // .requiredWhen((field) => field.parent.categoryId === MediaCategoriesEnum.ANIME)
    pages: vine.number().positive().nullable().optional(),
    // .requiredWhen((field) => field.parent.categoryId === MediaCategoriesEnum.BOOK),
  })
)

export const mediaFiltersValidator = vine.compile(
  vine.object({
    search: vine.string().trim().escape().optional(),
    // for select input purpose
    //   // status: vine
    //   //   .number()
    //   //   .exists(async (db, value) => {
    //   //     if (!value) {
    //   //       return true
    //   //     }
    //   //     const statusExists = await db.from('media_statuses').select('id').where('id', value).first()
    //   //     return !!statusExists
    //   //   })
    //   //   .optional(),
    sortBy: vine
      .string()
      .exists(async (_db, value) => {
        return MediaService.sortOptions.some((option) => option.value === value)
      })
      .optional(),
    status: vine
      .array(vine.number().isExists({ table: 'media_statuses', column: 'id' }))
      .optional(),
    types: vine.array(vine.number().isExists({ table: 'media_types', column: 'id' })).optional(),
    genres: vine.array(vine.number().isExists({ table: 'genres', column: 'id' })).optional(),
    platforms: vine
      .array(vine.number().isExists({ table: 'game_platforms', column: 'id' }))
      .optional(),
    duration: vine.number().nullable().optional(),
    favorite: vine.boolean().optional(),
  })
)
