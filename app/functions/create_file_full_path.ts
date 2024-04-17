export function createFullPath(
  filename: string,
  filepath: string,
  fileExtension: string,
  withRaw: boolean
): string {
  if (withRaw) {
    return `${filepath}${filename}-raw${fileExtension}`
  }
  return `${filepath}${filename}${fileExtension}`
}
