import vine from '@vinejs/vine'

export const createMediaValidator = vine.withMetaData<{ categoryId: number }>().compile(
  vine.object({
    categoryId: vine.number().isExists({ table: 'media_categories', column: 'id' }),
    statusId: vine.number().isExists({ table: 'media_statuses', column: 'id' }),
    typeId: vine
      .number()
      .isExists({ table: 'media_types', column: 'id' })
      .isAssociatedTo({ table: 'media_types', pk_column: 'id', fk_column: 'category_id' }),
    name: vine.string().trim(),
    alternativeName: vine.string().trim().nullable(),
    released: vine.string().trim().nullable(),
    synopsis: vine.string().trim().nullable(),
    tagId: vine.number().isExists({ table: 'tags', column: 'id' }),
    genreId: vine
      .array(
        vine
          .number()
          .isExists({ table: 'genres', column: 'id' })
          .isAssociatedTo({ table: 'genres', pk_column: 'id', fk_column: 'category_id' })
      )
      .distinct(),
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

export const updateMediaValidator = vine.withMetaData<{ categoryId: number }>().compile(
  vine.object({
    //params
    params: vine.object({
      mediaId: vine.number().isExists({ table: 'media', column: 'id' }),
    }),
    //body
    categoryId: vine.number().isExists({ table: 'media_categories', column: 'id' }),
    statusId: vine.number().isExists({ table: 'media_statuses', column: 'id' }),
    typeId: vine
      .number()
      .isExists({ table: 'media_types', column: 'id' })
      .isAssociatedTo({ table: 'media_types', pk_column: 'id', fk_column: 'category_id' }),
    name: vine.string().trim(),
    alternativeName: vine.string().trim().nullable(),
    released: vine.string().trim().nullable(),
    synopsis: vine.string().trim().nullable(),
    tagId: vine.number().isExists({ table: 'tags', column: 'id' }),
    genreId: vine
      .array(
        vine
          .number()
          .isExists({ table: 'genres', column: 'id' })
          .isAssociatedTo({ table: 'genres', pk_column: 'id', fk_column: 'category_id' })
      )
      .distinct(),
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
  })
)
