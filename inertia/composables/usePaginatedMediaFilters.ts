import { useForm } from '@inertiajs/vue3'
import { computed, onMounted, toRef, watch, type MaybeRef } from 'vue'

interface IFilters {
  search: string
  sortBy: string
  status: number[]
  types: number[]
  genres: number[]
  platforms: number[]
  duration: string | undefined
  publishers: number[]
  favorite: boolean
}

function cleanFilters(filters: IFilters, defaultSortBy: string) {
  const cleaned: Partial<IFilters> = {}
  if (filters.search && filters.search.length > 0) {
    cleaned.search = filters.search
  }
  if (filters.sortBy && filters.sortBy !== defaultSortBy) {
    cleaned.sortBy = filters.sortBy
  }
  if (filters.status && filters.status.length > 0) {
    cleaned.status = filters.status
  }
  if (filters.types && filters.types.length > 0) {
    cleaned.types = filters.types
  }
  if (filters.genres && filters.genres.length > 0) {
    cleaned.genres = filters.genres
  }
  if (filters.platforms && filters.platforms.length > 0) {
    cleaned.platforms = filters.platforms
  }
  if (filters.duration && filters.duration.length > 0) {
    cleaned.duration = filters.duration
  }
  if (filters.publishers && filters.publishers.length > 0) {
    cleaned.publishers = filters.publishers
  }
  if (filters.favorite === true) {
    cleaned.favorite = filters.favorite
  }
  return cleaned
}

export function usePaginatedMediaFilters(
  category: MaybeRef<string>,
  sortOptions: MaybeRef<{ value: string }[]>
) {
  const categoryRef = toRef(category)
  const sortOptionsRef = toRef(sortOptions)

  // argument passed to conserve values when navigate between pages
  const filters = useForm<IFilters>('filterResults', {
    search: '',
    sortBy: sortOptionsRef.value[0].value,
    status: [],
    types: [],
    genres: [],
    platforms: [],
    duration: '',
    publishers: [],
    favorite: false,
  })

  const baseUrl = computed(() => `/categories/${categoryRef.value}`)

  function submitFilters() {
    const defaultSort = sortOptionsRef.value[0].value
    filters
      .transform((data) => cleanFilters(data, defaultSort))
      .get(baseUrl.value, { preserveState: true, preserveScroll: true })
  }

  function fetchNewPageData(url: string | null) {
    if (!url) return
    const defaultSort = sortOptionsRef.value[0].value
    filters
      .transform((data) => cleanFilters(data, defaultSort))
      .get(url, { preserveState: true, preserveScroll: true })
  }

  function resetFilters() {
    filters.defaults({
      sortBy: sortOptionsRef.value[0].value,
      status: [],
      types: [],
      genres: [],
      platforms: [],
      duration: '',
      publishers: [],
      favorite: false,
    })
    // Conditionally set a default for 'duration'
    if (categoryRef.value !== 'movie') {
      filters.defaults('duration', undefined)
    } else {
      filters.defaults('duration', '')
    }
    filters.reset()
  }

  watch(
    categoryRef,
    (newCategory) => {
      filters.duration = newCategory === 'movie' ? '' : undefined
    },
    { immediate: true }
  )

  // onMounted(() => {
  //   if (categoryRef.value !== 'movie') {
  //     filters.duration = undefined
  //   }
  // })

  return { filters, submitFilters, fetchNewPageData, resetFilters }
}
