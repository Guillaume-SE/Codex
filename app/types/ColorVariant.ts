const color = [
  'primary',
  'secondary',
  'accent',
  'info',
  'neutral',
  'success',
  'warning',
  'error',
] as const

export type ColorVariant = (typeof color)[number]
