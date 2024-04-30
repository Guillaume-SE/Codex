import { ReviewStatus } from '#enums/ReviewStatus'

export interface IReview {
  status: ReviewStatus
  rating: number | null
  opinion: string | null
  isFavorite: boolean
}
