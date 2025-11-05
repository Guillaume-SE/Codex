import { useForm } from '@inertiajs/vue3'

//  base URL for the resource's management page (e.g., '/platform/manage').
export function usePaginatedFilters(baseUrl: string) {
  const filters = useForm<{ search: string }>('taxonomyFiltersResults', {
    search: '',
  })

  function submitFilters() {
    filters.get(baseUrl, {
      preserveState: true,
      preserveScroll: true,
    })
  }

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
    fetchNewPageData,
  }
}
