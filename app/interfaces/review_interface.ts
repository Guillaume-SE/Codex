export interface IReview {
  id?: number
  mediaId?: number
  rating: number | null
  opinion: string | null
  isFavorite: boolean
  updatedAt?: number
}
