const status = ['en cours', 'terminé', 'en pause', 'abandonné', 'prévu'] as const

export type ReviewStatus = (typeof status)[number]

export { status as validReviewStatus }
