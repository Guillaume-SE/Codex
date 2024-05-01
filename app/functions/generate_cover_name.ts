import { PathLike } from 'fs'

export function createFileName(
  name: string,
  fileExtension: string | PathLike,
  withRaw: boolean
): string {
  if (withRaw) {
    return `${name}-raw${fileExtension}`
  }
  return `${name}${fileExtension}`
}
