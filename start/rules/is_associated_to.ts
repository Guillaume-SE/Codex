import db from '@adonisjs/lucid/services/db'
import vine, { VineNumber, VineString } from '@vinejs/vine'
import type { FieldContext } from '@vinejs/vine/types'

type Options = {
  table: string
  pk_column: string
  fk_column: string
}

async function isAssociatedTo(value: unknown, options: Options, field: FieldContext) {
  if (typeof value !== 'string' && typeof value !== 'number') {
    return
  }

  const result = await db
    .from(options.table)
    .select(options.pk_column)
    .where(options.pk_column, value)
    .andWhere(options.fk_column, field.meta.categoryId)
    .first()

  if (!result) {
    field.report('Le champs {{ field }} choisi ne correspond pas', 'isAssociatedTo', field)
  }
}

export const isAssociatedToRule = vine.createRule(isAssociatedTo)

declare module '@vinejs/vine' {
  interface VineString {
    isAssociatedTo(options: Options): this
  }

  interface VineNumber {
    isAssociatedTo(options: Options): this
  }
}

// give ability to use it like a native VineJS rules
VineString.macro('isAssociatedTo', function (this: VineString, options: Options) {
  return this.use(isAssociatedToRule(options))
})

VineNumber.macro('isAssociatedTo', function (this: VineNumber, options: Options) {
  return this.use(isAssociatedToRule(options))
})
