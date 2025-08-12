import { type InertiaForm } from '@inertiajs/vue3'

export function useResourceForm<T extends object>(form: InertiaForm<T>, apiUrl: string) {
  function create(options = {}) {
    form.post(apiUrl, options)
  }

  function update(id: number | string, options = {}) {
    form.put(`${apiUrl}/${id}`, options)
  }

  function destroy(id: number | string, options = {}) {
    form.delete(`${apiUrl}/${id}`, options)
  }

  return { create, update, destroy }
}
