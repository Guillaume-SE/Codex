export function formatDate(isoDate: string) {
  const date = new Date(isoDate)
  const year = date.getFullYear()
  // padStart() to ensure all months are with 2 numbers at least (like 01 for Jan.)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
