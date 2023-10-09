const status = [
    'en cours',
    'abandonné',
    'terminé',
    'prévu'
] as const

export type ReviewStatus = typeof status[number]