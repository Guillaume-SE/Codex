import { formatDuration } from '#utils/formatDuration'

export function useFormattedDuration(duration: number | null) {
  if (duration) {
    return formatDuration(duration)
  }
  return ''
}
