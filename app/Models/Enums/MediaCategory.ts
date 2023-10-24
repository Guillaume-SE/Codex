const category = [
    'jeux',
    'film',
    'saison',
    'livre'
] as const

export type MediaCategory = typeof category[number]