export interface INewMediaPayload {
  mediaParentId: number | null
  categoryId: number
  typeId: number
  name: string
  alternativeName: string | null
  released: string
  synopsis: string | null
  genresIds: Array<number>
  platformId?: number
  duration?: number | null
  seriesSeasonLength?: number | null
  animeSeasonLength?: number | null
  pages?: number | null
}

export interface IMedia {
  mediaParentId: number | null
  categoryId: number
  typeId: number
  name: string
  alternativeName: string | null
  released: string
  synopsis: string | null
}
