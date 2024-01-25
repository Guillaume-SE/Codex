const types = [
  'jeu de base',
  'extension',
  'série',
  'animé',
  'dessin animé',
  'film',
  'manga',
  'roman',
  'comics',
  'bande dessinée',
  'artbook',
] as const

export type MediaTypes = (typeof types)[number]
export { types as validMediaTypes }

export const gameTypes = ['jeu de base', 'extension']

export const movieTypes = ['film']

export const seasonTypes = ['série', 'animé', 'dessin animé']

export const bookTypes = ['manga', 'roman', 'comics', 'bande dessinée', 'artbook']
