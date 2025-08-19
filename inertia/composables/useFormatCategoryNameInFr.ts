import type { MediaCategories } from '#types/MediaCategories'

export function useFormatCategoryNameInFr(name: MediaCategories): string {
  switch (name) {
    case 'movie':
      return 'film'
    case 'game':
      return 'jeu'
    case 'series':
      return 'série'
    case 'anime':
      return 'animé'
    case 'book':
      return 'livre'
    default:
      return ''
  }
}
