import { formatDate } from '#utils/formatDate'

export function useFormattedDate(date: string | null) {
  if (date) {
    return formatDate(date)
  }
  return ''
}
