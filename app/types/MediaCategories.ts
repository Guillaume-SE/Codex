const categories = ['game', 'movie', 'series', 'anime', 'book'] as const
export type MediaCategories = (typeof categories)[number]
