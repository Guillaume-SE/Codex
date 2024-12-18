export function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  const formattedMinutes = remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes
  return hours > 0 ? `${hours}h${formattedMinutes}` : `${remainingMinutes}min`
}
