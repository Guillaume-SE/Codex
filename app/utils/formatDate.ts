export function formatDate(isoDate: string) {
  const date = new Date(isoDate)
  const year = date.getFullYear()
  // padStart() to ensure all months are with 2 numbers at least (like 01 for Jan.)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function formatDateToLocale(isoDate: string | number, withTime: boolean = false) {
  const date = new Date(isoDate)
  const formattedDate = date.toLocaleDateString()

  if (withTime) {
    const formattedTime = date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })

    return `${formattedDate} à ${formattedTime}`
  }

  return formattedDate
}
