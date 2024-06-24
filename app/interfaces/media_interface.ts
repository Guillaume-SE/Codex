import { GamePlatform } from '#enums/GamePlatform'
import { MediaTypes } from '#enums/MediaTypes'
import { ReviewStatus } from '#enums/ReviewStatus'
import { MultipartFile } from '@adonisjs/core/bodyparser'

export interface INewMedia {
  mediaParentId: number | null
  cover?: MultipartFile | null
  categoryId: number
  typeId: number
  name: string
  released: string
  synopsis: string | null
  developer?: string
  publisher?: string
  platform?: number
  director?: string
  screenwriter?: string
  duration?: number
  creator?: string
  length?: number
  author?: string
  illustrator?: string | null
  editor?: string
  pages?: number
  status?: ReviewStatus
  rating?: number | null
  opinion?: string | null
  isFavorite?: boolean
}

export interface IMedia {
  mediaParentId: number | null
  categoryId: number
  typeId: number
  name: string
  released: string
  synopsis: string | null
}

export interface IMovie extends IMedia {
  director: string
  screenwriter: string
  duration: number
}

export interface IGame extends IMedia {
  developer: string
  publisher: string
  platform: GamePlatform
}

export interface IBook extends IMedia {
  author: string
  illustrator: string | null
  editor: string
  pages: number
}

export interface ISeason extends IMedia {
  creator: string
  length: number
}
