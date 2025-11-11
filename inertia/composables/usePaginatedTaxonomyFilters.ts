import { useForm } from '@inertiajs/vue3'
import { watch } from 'vue'
import { useDebounce } from '~/composables/useDebounce'

//  base URL for the resource's management page (e.g., '/platform/manage').
export function usePaginatedTaxonomyFilters(baseUrl: string) {
  const filters = useForm<{ search: string }>('taxonomyFiltersResults', {
    search: '',
  })

  function submitFilters() {
    filters.get(baseUrl, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  const debouncedSubmit = useDebounce(submitFilters, 500)

  watch(
    () => filters.search,
    (newValue, oldValue) => {
      // Optional: submit immediately if user clears the search
      if (newValue === '' && oldValue !== '') {
        submitFilters()
      } else {
        debouncedSubmit()
      }
    }
  )

  // handle pagination clicks
  function fetchNewPageData(url: string | null) {
    if (!url) return
    filters.get(url, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  return {
    filters,
    submitFilters,
    debouncedSubmit,
    fetchNewPageData,
  }
}
