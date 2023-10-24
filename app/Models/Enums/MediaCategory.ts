const category = [
    'jeux',
    'film',
    'série',
    'animé',
    'livre'
] as const

export type MediaCategory = typeof category[number]