export interface ICover {
  id?: number
  mediaId?: number
  originalCoverFilename: string
  smallCoverFilename: string
  mediumCoverFilename: string
  largeCoverFilename: string
}

export interface ICoverFilenames {
  original: string
  small: string
  medium: string
  large: string
}
