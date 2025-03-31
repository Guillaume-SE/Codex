import { formatDate, formatDateToLocale } from '#utils/formatDate'

export function useFormattedDate(date: string | null) {
  if (date) {
    return formatDate(date)
  }
  return ''
}

export function useFormattedDateToLocale(
  isoDate: string | null | number,
  withTime: boolean = false
) {
  if (!isoDate) {
    return
  }
  return formatDateToLocale(isoDate, withTime)
}
