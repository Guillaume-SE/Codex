import { IMedia } from './media_interface.js'

export interface IMediaContributors {
  id?: number
  media?: IMedia
  job?: {
    id?: number
    name?: string
  }
  contributor?: {
    id: number
    name?: string
  }
}
