import type { IMedia } from '#interfaces/media_interface'

export interface IMediaContributor {
  contributorId: number
  roleId: number
}

export interface IMediaContributors {
  id?: number
  media?: IMedia
  contributor?: {
    id: number
    name?: string
  }
  role?: {
    id?: number
    name?: string
  }
}
