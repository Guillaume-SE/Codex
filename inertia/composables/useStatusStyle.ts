import type { MediaStatuses } from '#types/MediaStatuses'
import { computed, toRef, type MaybeRef } from 'vue'

const statusStyles: Record<MediaStatuses, { bg: string; icon: string }> = {
  'en cours': { bg: 'background-in-progress', icon: 'icon-in-progress' },
  'terminé': { bg: 'background-completed', icon: 'icon-completed' },
  'en pause': { bg: 'background-paused', icon: 'icon-paused' },
  'abandonné': { bg: 'background-dropped', icon: 'icon-dropped' },
  'prévu': { bg: 'background-planned', icon: 'icon-planned' },
}

export function useStatusStyles(status: MaybeRef<string>) {
  const statusRef = toRef(status)

  const backgroundColor = computed(() => {
    return statusStyles[statusRef.value as MediaStatuses]?.bg || ''
  })

  const iconColor = computed(() => {
    return statusStyles[statusRef.value as MediaStatuses]?.icon || ''
  })

  return { backgroundColor, iconColor }
}
