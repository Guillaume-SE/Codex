const types = [
    'jeu vidéo',
    'dlc',
    'dessin animé',
    'série',
    'animé',
    'manga',
    'roman',
    'comics',
    'bande dessinée'
] as const

export type MediaTypes = typeof types[number]