const types = [
    'jeu vidéo',
    'dlc',
    'série',
    'animé',
    'dessin animé',
    'cartoon',
    'film',
    'manga',
    'roman',
    'comics',
    'bande dessinée',
    'autre'
] as const

export type MediaTypes = typeof types[number]