import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type SupportedLocale } from '#constants/locales'
import type { HttpContext } from '@adonisjs/core/http'

export default class LanguagesController {
  async update({ request, response, auth }: HttpContext) {
    const { locale } = request.only(['locale'])
    const targetLocale: SupportedLocale = SUPPORTED_LOCALES.includes(locale)
      ? (locale as SupportedLocale)
      : DEFAULT_LOCALE

    response.cookie('app_locale', targetLocale, {
      maxAge: '1y',
      httpOnly: true,
      sameSite: 'lax',
    })

    if (auth.user) {
      auth.user.preferences = {
        ...auth.user.preferences,
        language: targetLocale,
      }
      await auth.user.save()
    }

    return response.redirect().back()
  }
}
