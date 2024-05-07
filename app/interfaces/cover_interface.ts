import { MultipartFile } from '@adonisjs/core/bodyparser'

export interface INewCover {
  cover: MultipartFile
}

export interface ICover {
  filename: string
  filenameRaw: string | null
  alternative: string
}
