import { Exception } from '@adonisjs/core/exceptions'

export default class ExternalApiException extends Exception {
  static status = 502
  static code = 'E_EXTERNAL_API_ERROR'

  constructor(providerName: string, statusCode: number) {
    super(`[${providerName}] service error or unavailable (HTTP ${statusCode})`, {
      status: ExternalApiException.status,
      code: ExternalApiException.code,
    })
  }
}
