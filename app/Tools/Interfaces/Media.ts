import { GamePlatform } from "App/Tools/Enums/GamePlatform"
import { MediaTypes } from "App/Tools/Enums/MediaTypes"

export interface IMedia {
  id: number
  mediaParentId: number | null
  type: MediaTypes
  name: string
  released: string
  synopsis: string
}

export interface IGame extends IMedia {
  mediaId?: number
  developer: string
  publisher: string
  platform: GamePlatform
}

export interface IMovie extends IMedia {
  mediaId?: number
  director: string
  screenwriter: string
  duration: number
}

export interface IBook extends IMedia {
  mediaId?: number
  author: string
  illustrator: string | null
  editor: string
  pages: number
}

export interface ISeason extends IMedia {
  mediaId?: number
  creator: string
  length: number
}
