export function useRatingColorClass(rating: number | null): string {
  if (rating === null || rating === undefined || isNaN(rating)) {
    return 'rating-default'
  }

  if (rating >= 0 && rating <= 4) {
    return 'rating-bad'
  } else if (rating >= 5 && rating <= 7) {
    return 'rating-mid'
  } else if (rating >= 8 && rating <= 10) {
    return 'rating-good'
  }

  return 'rating-default'
}
