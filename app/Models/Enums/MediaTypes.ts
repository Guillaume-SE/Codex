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
  'artbook',
] as const

export type MediaTypes = (typeof types)[number]
export { types as validMediaTypes }

export const gameTypes = ['jeu vidéo', 'dlc']

export const movieTypes = ['film']

export const seasonTypes = ['série', 'animé', 'dessin animé', 'cartoon']

export const bookTypes = ['manga', 'roman', 'comics', 'bande dessinée', 'artbook']
