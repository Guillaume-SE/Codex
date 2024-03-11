import { GamePlatform } from 'App/Tools/Enums/GamePlatform'
import { MediaTypes } from 'App/Tools/Enums/MediaTypes'
import { DateTime } from 'luxon'

export interface IMedia {
  id: number
  mediaParentId: number | null
  type: MediaTypes
  name: string
  released: string
  synopsis: string
  createdAt?: number
  updatedAt?: number
}

export interface IGame extends IMedia {
  developer: string
  publisher: string
  platform: GamePlatform
}

export interface IMovie extends IMedia {
  director: string
  screenwriter: string
  duration: number
}

export interface IBook extends IMedia {
  author: string
  illustrator: string
  editor: string
  pages: number
}

export interface ISeason extends IMedia {
  creator: string
  length: number
}
