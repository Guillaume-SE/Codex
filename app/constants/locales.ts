export const LOCALES = {
  FR: 'fr-FR',
  EN: 'en-US',
} as const

export type SupportedLocale = (typeof LOCALES)[keyof typeof LOCALES]

export const DEFAULT_LOCALE: SupportedLocale = LOCALES.FR
export const SUPPORTED_LOCALES = Object.values(LOCALES)
