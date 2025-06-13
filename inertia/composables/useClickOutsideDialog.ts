import { onMounted, onUnmounted, Ref } from 'vue'

// not used but keeped as reference
export function useClickOutsideDialog(
  dialogRef: Ref<HTMLDialogElement | null>,
  onClose: () => void
) {
  const handleClickOutside = (e: MouseEvent) => {
    if (!dialogRef.value) return

    const dialogDimensions = dialogRef.value.getBoundingClientRect()
    // Check if the click was inside the modal
    if (dialogRef.value.contains(e.target as Node)) {
      return
    }

    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      onClose()
    }
  }

  onMounted(() => {
    dialogRef.value?.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    dialogRef.value?.removeEventListener('click', handleClickOutside)
  })
}
