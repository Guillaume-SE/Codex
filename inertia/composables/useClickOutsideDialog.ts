import { onMounted, onUnmounted, Ref } from 'vue'

export function useClickOutsideDialog(
  dialogRef: Ref<HTMLElement | null>,
  targetRef: Ref<HTMLElement | null>,
  onClose: () => void
) {
  const handleClickOutside = (e: MouseEvent) => {
    const modal = dialogRef.value
    const target = targetRef.value

    if (!modal || !target) return

    if (modal.contains(e.target as Node) && !target.contains(e.target as Node)) {
      // Optional: Guard for open selects
      const activeElement = document.activeElement
      if (activeElement && activeElement.tagName === 'SELECT') return

      onClose()
    }
  }

  onMounted(() => document.addEventListener('click', handleClickOutside))
  onUnmounted(() => document.removeEventListener('click', handleClickOutside))
}
