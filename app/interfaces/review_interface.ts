export interface IReview {
  statusId: number
  rating: number | null
  opinion: string | null
  isFavorite: boolean
  createdAt?: number
  updatedAt?: number
}
