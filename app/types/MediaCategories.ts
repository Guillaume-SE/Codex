const categories = ['game', 'movie', 'series', 'anime', 'book'] as const
const categoriesFr = ['jeu', 'film', 'série', 'anime', 'livre'] as const
export type MediaCategories = (typeof categories)[number]
export type MediaCategoriesFr = (typeof categoriesFr)[number]
