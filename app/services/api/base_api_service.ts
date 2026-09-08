import ExternalApiException from '#exceptions/external_api_exception'
import ResourceNotFoundException from '#exceptions/resource_not_found_exception'

export abstract class BaseApiService {
  abstract readonly providerName: string
  abstract readonly baseUrl: string
  protected timeoutMs: number = 5000

  // base headers for the API provider. Override in child classes for custom auth.
  protected getHeaders(): Record<string, string> {
    return {}
  }

  // centralized HTTP request execution with automatic timeout and exception throwing
  protected async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // allow flexibility to pass either full url or partial like pagination
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`

    const defaultHeaders: Record<string, string> = {
      Accept: 'application/json',
    }

    let response: Response

    try {
      response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...this.getHeaders(),
          ...options.headers,
        },
        signal: options.signal ?? AbortSignal.timeout(this.timeoutMs),
      })
    } catch (error: any) {
      if (error.name === 'TimeoutError') {
        throw new ExternalApiException(this.providerName, 504)
      }
      // DNS failures, dropped connections, or network down
      throw new ExternalApiException(this.providerName, 503)
    }

    // early return when good response
    if (response.ok) {
      return response.json() as Promise<T>
    }

    if (response.status === 404) {
      throw new ResourceNotFoundException(
        `[${this.providerName}] resource not found at ${endpoint}`
      )
    }

    throw new ExternalApiException(this.providerName, response.status)
  }
}
