import { type InertiaForm } from '@inertiajs/vue3'
import { toValue, type MaybeRef } from 'vue'

export function useResourceForm<T extends object>(form: InertiaForm<T>, apiUrl: MaybeRef<string>) {
  // toValue() make url reactive to have the latest url passed in argument
  function create(options = {}) {
    form.post(toValue(apiUrl), options)
  }

  function update(id: number | string, options = {}) {
    form.put(`${toValue(apiUrl)}/${id}`, options)
  }

  function destroy(id: number | string, options = {}) {
    form.delete(`${toValue(apiUrl)}/${id}`, options)
  }

  return { create, update, destroy }
}
