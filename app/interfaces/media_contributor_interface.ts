export interface IMediaContributor {
  contributorId: number
  roleId: number
}

export interface IMediaContributors {
  id?: number
  contributor: {
    id: number
    name: string
  }
  role: {
    id: number
    name: string
  }
}
