import type { MediaCategories, MediaCategoriesFr } from '#types/MediaCategories'
import { computed, type Ref } from 'vue'

const categoryConfig: Record<MediaCategories, { title: string; categoryFr: MediaCategoriesFr }> = {
  game: { title: 'Liste des jeux', categoryFr: 'jeu' },
  movie: { title: 'Liste des films', categoryFr: 'film' },
  series: { title: 'Liste des séries', categoryFr: 'série' },
  book: { title: 'Liste des livres', categoryFr: 'livre' },
  anime: { title: 'Liste des animes', categoryFr: 'anime' },
}

export function useCategoryInfo(category: Ref<MediaCategories>) {
  const info = computed(() => categoryConfig[category.value])

  const title = computed(() => info.value.title)
  const categoryFr = computed(() => info.value.categoryFr)

  return { title, categoryFr }
}
