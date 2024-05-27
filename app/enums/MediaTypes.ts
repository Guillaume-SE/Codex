export const gameTypes = ['jeu de base', 'extension']
export { gameTypes as validGameTypes }

export const movieTypes = ['film']
export { movieTypes as validMovieTypes }

export const seasonTypes = ['série', 'animé', 'dessin animé']
export { seasonTypes as validSeasonTypes }

export const bookTypes = ['manga', 'roman', 'comics', 'bande dessinée', 'artbook']
export { bookTypes as validBookTypes }

const types = [...gameTypes, ...movieTypes, ...seasonTypes, ...bookTypes] as const
const categories = ['jeu vidéo', 'film', 'saison', 'livre']

// for TS type, mainly for Media Model
export type MediaTypes = (typeof types)[number]
export { types as validMediaTypes }

export type MediaCategories = (typeof categories)[number]
