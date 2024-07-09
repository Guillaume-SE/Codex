import vine from '@vinejs/vine'

export const createMediaValidator = vine.compile(
  vine.object({
    mediaParentId: vine.number().positive().nullable(),
    categoryId: vine.number().positive(),
    typeId: vine.number().positive(),
    name: vine.string().trim(),
    alternativeName: vine.string().trim().nullable(),
    released: vine.string().trim(),
    genresIds: vine.array(vine.number()),
    synopsis: vine.string().trim(),
    // specific infos
    platformId: vine.number().positive().optional(),
    pages: vine.number().positive().nullable().optional(),
    duration: vine.number().positive().nullable().optional(),
    animeSeasonLength: vine.number().positive().nullable().optional(),
    seriesSeasonLength: vine.number().positive().nullable().optional(),
  })
)