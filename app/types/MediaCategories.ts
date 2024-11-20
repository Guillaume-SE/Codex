const categories = ['game', 'movie', 'series', 'anime', 'book']
const categoriesFr = ['jeu', 'film', 'série', 'anime', 'livre']
export type MediaCategories = (typeof categories)[number]
export type MediaCategoriesFr = (typeof categoriesFr)[number]
