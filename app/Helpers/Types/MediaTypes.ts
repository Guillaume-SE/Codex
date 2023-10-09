const types = [
    'jeu vidéo',
    'film',
    'série',
    'livre',
    'épisode',
    'dlc'
] as const

export type MediaTypes = typeof types[number]