import { DateTime } from 'luxon'

// safely create a DateTime object from any input
function toDateTime(dateInput: DateTime | string | null | undefined): DateTime {
  if (!dateInput) return DateTime.invalid('Null or undefined input')
  if (typeof dateInput === 'string') return DateTime.fromISO(dateInput)

  return dateInput
}

// for relative time display (e.g., "il y a 2 jours")
export function formatToRelative(dateInput: DateTime | string | null | undefined): string {
  const dt = toDateTime(dateInput)
  if (!dt.isValid) return 'Date invalide'

  const relativeDate = dt.toRelative({ locale: 'fr' })
  return relativeDate ?? 'Date invalide'
}

// for standard date display (e.g., "20 nov. 1995")
export function formatToDateMed(dateInput: DateTime | string | null | undefined): string {
  const dt = toDateTime(dateInput)
  if (!dt.isValid) return 'Date invalide'

  return dt.toLocaleString(DateTime.DATE_MED, { locale: 'fr' })
}

// for pre-filling HTML date inputs. Returns date in "yyyy-MM-dd" format.
export function formatToISOForInput(
  dateInput: DateTime | string | null | undefined
): string | null {
  const dt = toDateTime(dateInput)
  if (!dt.isValid) return null

  return dt.toISODate()
}
