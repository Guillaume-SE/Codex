import { type InertiaForm } from '@inertiajs/vue3'
import { watch } from 'vue'

interface IProps {
  errors?: Record<string, string[]>
}

export function useErrorSyncer(props: IProps, form: InertiaForm<any>) {
  watch(
    () => props.errors,
    (newErrors) => {
      form.clearErrors()

      if (!newErrors || Object.keys(newErrors).length === 0) {
        return
      }

      // transform and set the new errors because i use router. instead of form.
      const formattedErrors = Object.fromEntries(
        Object.entries(newErrors).map(([key, value]) => [key, value[0]])
      )
      form.setError(formattedErrors as any)
    },
    { deep: true }
  )
}
