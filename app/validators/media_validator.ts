import vine from '@vinejs/vine'

export const createMediaValidator = vine.compile(
  vine.object({
    mediaParentId: vine.number().positive().nullable(),
    statusId: vine.number().positive(),
    categoryId: vine.number().positive(),
    typeId: vine.number().positive(),
    name: vine.string().trim(),
    alternativeName: vine.string().trim().nullable(),
    released: vine.string().trim().nullable(),
    synopsis: vine.string().trim().nullable(),
    genresIds: vine.array(vine.number()),
    // specific infos
    platformId: vine.number().positive().nullable().optional(),
    pages: vine.number().positive().nullable().optional(),
    duration: vine.number().positive().nullable().optional(),
    animeSeasonLength: vine.number().positive().nullable().optional(),
    seriesSeasonLength: vine.number().positive().nullable().optional(),
  })
)

export const updateMediaValidator = vine.compile(
  vine.object({
    mediaParentId: vine.number().positive().nullable(),
    statusId: vine.number().positive(),
    typeId: vine.number().positive(),
    name: vine.string().trim(),
    alternativeName: vine.string().trim().nullable(),
    released: vine.string().trim().nullable(),
    synopsis: vine.string().trim().nullable(),
    genresIds: vine.array(vine.number()),
    // specific infos
    platformId: vine.number().positive().nullable().optional(),
    pages: vine.number().positive().nullable().optional(),
    duration: vine.number().positive().nullable().optional(),
    animeSeasonLength: vine.number().positive().nullable().optional(),
    seriesSeasonLength: vine.number().positive().nullable().optional(),
  })
)
