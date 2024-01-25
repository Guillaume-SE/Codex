const rating = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const

export type ReviewRating = (typeof rating)[number]

export const validReviewRating = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
