const GIGABYTE = 1_000_000_000
const MEGABYTE = 1_000_000

export function convertBytesTo(bytes: number | undefined, unit: 'Go' | 'Mo'): number {
  if (!bytes) return 0

  const divisor = unit === 'Go' ? GIGABYTE : MEGABYTE
  return bytes / divisor
}

export function formatBytes(bytes: number | undefined): string {
  if (!bytes || bytes === 0) return '0 Mo'

  // If usage is 1 GB or more, display in Gigabytes
  if (bytes >= GIGABYTE) {
    const valueInGo = convertBytesTo(bytes, 'Go')
    return `${valueInGo.toFixed(2)} Go`
  }

  // Otherwise, display in Megabytes
  const valueInMo = convertBytesTo(bytes, 'Mo')
  return `${valueInMo.toFixed(2)} Mo`
}
