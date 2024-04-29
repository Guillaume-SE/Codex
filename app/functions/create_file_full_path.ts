export function createFullPath(
  filename: string | undefined,
  filepath: string | undefined,
  fileExtension: string | undefined,
  withRaw: boolean
): string {
  if (withRaw) {
    return `${filepath}${filename}-raw${fileExtension}`
  }
  return `${filepath}${filename}${fileExtension}`
}
