import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type SupportedLocale } from '#constants/locales'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class LocaleMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { request, auth, inertia } = ctx

    let locale: SupportedLocale = DEFAULT_LOCALE

    if (auth?.user?.preferences?.language) {
      locale = auth.user.preferences.language as SupportedLocale
    } else {
      const cookieLocale = request.cookie('app_locale')
      if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as SupportedLocale)) {
        locale = cookieLocale as SupportedLocale
      }
    }

    // allow controllers to access `ctx.locale`
    ctx.locale = locale

    inertia.share({
      currentLocale: locale,
    })

    const output = await next()
    return output
  }
}

// extend HttpContext interface for TypeScript autocompletion
declare module '@adonisjs/core/http' {
  interface HttpContext {
    locale: string
  }
}
