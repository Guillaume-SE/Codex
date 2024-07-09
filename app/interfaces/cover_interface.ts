import { MultipartFile } from '@adonisjs/core/bodyparser'

export interface INewCover {
  cover?: MultipartFile | null
}

export interface ICover {
  resizedVersion: string
  rawVersion: string
  alternativeText: string
}
