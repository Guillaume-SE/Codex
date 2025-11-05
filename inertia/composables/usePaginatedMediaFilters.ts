import { useForm } from '@inertiajs/vue3'
import { computed, toRef, type MaybeRef } from 'vue'

interface IFilters {
  search: string
  sortBy: string
  status: number[]
  types: number[]
  genres: number[]
  platforms: number[]
  duration: string
  publishers: number[]
  favorite: boolean
}

export const MAX_MOVIE_DURATION = '300'

function cleanFilters(filters: IFilters, defaultSortBy: string) {
  const cleaned: Partial<IFilters> = {}
  const isEmpty = (value: any) =>
    value === '' || value === false || (Array.isArray(value) && value.length === 0)

  for (const key in filters) {
    const filterKey = key as keyof IFilters
    const value = filters[filterKey]

    if (filterKey === 'sortBy' && value === defaultSortBy) {
      continue
    }

    if (filterKey === 'duration') {
      if (Number(value) >= Number(MAX_MOVIE_DURATION)) {
        continue
      }
    }

    // if the value is not empty -> add it to the cleaned object
    if (!isEmpty(value)) {
      ;(cleaned as any)[filterKey] = value
    }
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
  const filters = useForm<IFilters>('mediaFiltersResults', {
    search: '',
    sortBy: sortOptionsRef.value[0].value,
    status: [],
    types: [],
    genres: [],
    platforms: [],
    duration: MAX_MOVIE_DURATION,
    publishers: [],
    favorite: false,
  })

  const baseUrl = computed(() => `/categories/${categoryRef.value}`)

  filters.transform((data) => {
    const defaultSort = sortOptionsRef.value[0].value
    return cleanFilters(data, defaultSort)
  })

  function submitFilters() {
    filters.get(baseUrl.value, { preserveState: true, preserveScroll: true })
  }

  function fetchNewPageData(url: string | null) {
    if (!url) return

    filters.get(url, { preserveState: true, preserveScroll: true })
  }

  function resetFilters() {
    filters.defaults({
      search: '',
      sortBy: sortOptionsRef.value[0].value,
      status: [],
      types: [],
      genres: [],
      platforms: [],
      duration: MAX_MOVIE_DURATION,
      publishers: [],
      favorite: false,
    })
    filters.reset()
  }

  return { filters, submitFilters, fetchNewPageData, resetFilters }
}
