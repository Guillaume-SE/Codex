import { MultipartFile } from '@adonisjs/core/bodyparser'

export interface INewCover {
  cover: MultipartFile
}

export interface ICover {
  resizedVersion: string
  rawVersion: string
}
