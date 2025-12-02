import { ref } from 'vue'

export function useDebounce(callback: (...args: any[]) => void, delay: number = 500) {
  // setTimeout in browser = number, in Node = Timeout
  // so, ReturnType<typeof setTimeout> for "ref to be whatever setTimeout returns"
  const debounceTimer = ref<ReturnType<typeof setTimeout> | null>(null)

  const debouncedFunction = (...args: any[]) => {
    if (debounceTimer.value) {
      clearTimeout(debounceTimer.value)
    }

    debounceTimer.value = setTimeout(() => {
      callback(...args)
    }, delay)
  }

  return debouncedFunction
}
