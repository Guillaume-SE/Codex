const types = [
    'jeu vidéo',
    'dlc',
    'manga',
    'roman',
    'comics',
    'bande dessinée'
] as const

export type MediaTypes = typeof types[number]