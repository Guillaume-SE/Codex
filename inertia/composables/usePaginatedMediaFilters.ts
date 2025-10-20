import { useForm } from '@inertiajs/vue3'
import { computed, toRef, watch, type MaybeRef } from 'vue'

interface IFilters {
  search: string
  sortBy: string
  status: number[]
  types: number[]
  genres: number[]
  platforms: number[]
  duration: string | number | undefined
  publishers: number[]
  favorite: boolean
}

function cleanFilters(filters: IFilters, defaultSortBy: string) {
  const cleaned: Partial<IFilters> = {}
  const isEmpty = (value: any) =>
    value === '' || value === false || (Array.isArray(value) && value.length === 0)

  for (const key in filters) {
    const filterKey = key as keyof IFilters
    const value = filters[filterKey]

    if (filterKey === 'sortBy' && value === defaultSortBy) {
      continue // Skip if it's the default sort
    }

    // If the value is not empty, add it to the cleaned object
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
    // if (categoryRef.value !== 'movie') {
    //   filters.defaults('duration', undefined)
    // } else {
    //   filters.defaults('duration', '')
    // }
    filters.reset()
  }

  // watch(
  //   categoryRef,
  //   (newCategory) => {
  //     filters.duration = newCategory === 'movie' ? '' : undefined
  //   },
  //   { immediate: true }
  // )

  // onMounted(() => {
  //   if (categoryRef.value !== 'movie') {
  //     filters.duration = undefined
  //   }
  // })

  return { filters, submitFilters, fetchNewPageData, resetFilters }
}
