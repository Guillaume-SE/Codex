export function formatText(text?: string | null): string {
  if (!text || !text.trim()) return 'N/A'
  return text.trim()
}

export function formatArray(
  input?: (string | { name?: string } | undefined | null)[] | string | null
): string {
  if (!input) return 'N/A'
  if (typeof input === 'string') return input.trim() || 'N/A'
  if (!Array.isArray(input) || input.length === 0) return 'N/A'

  const items = input
    .map((item) => {
      if (!item) return null
      if (typeof item === 'string') return item.trim()
      if (typeof item === 'object' && 'name' in item && typeof item.name === 'string') {
        return item.name.trim()
      }
      return null
    })
    .filter((item): item is string => Boolean(item && item.length > 0))

  return items.length > 0 ? items.join(', ') : 'N/A'
}

export function formatCountryCodes(codes?: string[] | null): string {
  if (!codes?.length) return 'N/A'
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
  const names = codes.map((code) => {
    try {
      return regionNames.of(code.toUpperCase()) || code
    } catch {
      return code
    }
  })
  return names.join(', ')
}

export function formatCurrency(amount?: number | null): string {
  if (!amount || amount <= 0) return 'N/A'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatRuntime(minutes?: number | null): string {
  if (!minutes || minutes <= 0) return 'N/A'

  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hours === 0) return `${mins}m`
  if (mins === 0) return `${hours}h`

  const paddedMins = String(mins).padStart(2, '0')
  return `${hours}h${paddedMins}`
}

export function formatDate(dateString?: string | null, short = false): string {
  if (!dateString || dateString === 'N/A') return 'N/A'

  const [year, month, day] = dateString.split('-').map(Number)
  if (!year || !month || !day) return dateString

  const date = new Date(Date.UTC(year, month - 1, day))

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: short ? '2-digit' : 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}
