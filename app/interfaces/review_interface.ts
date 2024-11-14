export interface IReviewPayload {
  rating: number | null
  opinion: string | null
  isFavorite: boolean
}

export interface IReview extends IReviewPayload {
  id: number
  mediaId: number
  updatedAt: number
}
