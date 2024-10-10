import vine from '@vinejs/vine'

export const createContributorValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
  })
)

export const updateContributorValidator = vine.compile(
  vine.object({
    // params
    params: vine.object({
      contributorId: vine.number().isExists({ table: 'contributors', column: 'id' }),
    }),
    // body
    name: vine.string().trim(),
  })
)

export const deleteContributorValidator = vine.compile(
  vine.object({
    params: vine.object({
      contributorId: vine.number().isExists({ table: 'contributors', column: 'id' }),
    }),
  })
)
