import db from '@adonisjs/lucid/services/db'
import vine, { VineNumber, VineString } from '@vinejs/vine'
import type { FieldContext } from '@vinejs/vine/types'

type Options = {
  table: string
  column: string
}

async function isExists(value: unknown, options: Options, field: FieldContext) {
  if (typeof value !== 'string' && typeof value !== 'number') {
    return
  }

  const result = await db
    .from(options.table)
    .select(options.column)
    .where(options.column, value)
    .first()

  if (!result) {
    field.report("Le {{ field }} choisi n'existe pas", 'isExists', field)
  }
}

export const isExistsRule = vine.createRule(isExists)

declare module '@vinejs/vine' {
  interface VineString {
    isExists(options: Options): this
  }

  interface VineNumber {
    isExists(options: Options): this
  }
}

// give ability to use it like a native VineJS rules
VineString.macro('isExists', function (this: VineString, options: Options) {
  return this.use(isExistsRule(options))
})

VineNumber.macro('isExists', function (this: VineNumber, options: Options) {
  return this.use(isExistsRule(options))
})
