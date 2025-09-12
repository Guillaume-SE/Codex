import type { MediaStatuses } from '#types/MediaStatuses'
import { computed, toRef, type MaybeRef } from 'vue'

const statusStyles: Record<MediaStatuses, { backgroundHex: string; iconHex: string }> = {
  'en cours': { backgroundHex: '#daebfe', iconHex: '#2c7fff' },
  'terminé': { backgroundHex: '#d0fae5', iconHex: '#00bd7c' },
  'en pause': { backgroundHex: '#fef9c1', iconHex: '#f1b000' },
  'arrêté': { backgroundHex: '#ffe2e1', iconHex: '#ff1f56' },
  'prévu': { backgroundHex: '#f3e8ff', iconHex: '#ad47ff' },
}

export function useStatusStyles(status: MaybeRef<MediaStatuses>) {
  const statusRef = toRef(status)

  // Use a computed property to reactively return the style object for the current status
  const currentStyles = computed(() => {
    return statusStyles[statusRef.value]
  })

  // We return computed refs to the specific hex codes.
  return {
    backgroundHex: computed(() => currentStyles.value?.backgroundHex),
    iconHex: computed(() => currentStyles.value?.iconHex),
  }
}
