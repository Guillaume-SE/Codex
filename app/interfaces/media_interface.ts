export interface INewMediaPayload {
  mediaParentId: number | null
  statusId: number
  categoryId: number
  typeId: number
  name: string
  alternativeName: string | null
  released: string | null
  synopsis: string | null
  genresIds: Array<number>
  platformId?: number | null
  duration?: number | null
  seriesSeasonLength?: number | null
  animeSeasonLength?: number | null
  pages?: number | null
}

export interface IUpdatedMediaPayload {
  mediaParentId: number | null
  statusId: number
  typeId: number
  name: string
  alternativeName: string | null
  released: string | null
  synopsis: string | null
  genresIds: Array<number>
  platformId?: number | null
  duration?: number | null
  seriesSeasonLength?: number | null
  animeSeasonLength?: number | null
  pages?: number | null
}

export interface IMedia {
  mediaParentId: number | null
  statusId: number
  categoryId?: number
  typeId: number
  name: string
  alternativeName: string | null
  released: string | null
  synopsis: string | null
}
