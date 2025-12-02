<script setup lang="ts">
import type { MediaStatuses } from '#types/MediaStatuses'
import { computed, type PropType } from 'vue'
import StatusDotComp from '~/components/ui/StatusDotComp.vue'
import { useCapitalizeFirstLetter } from '~/composables/useCapitalizeFirstLetter'

const props = defineProps({
  status: {
    type: String as PropType<MediaStatuses>,
    required: true,
  },
})

const dotColorClass = computed(() => {
  switch (props.status) {
    case 'en cours':
      return 'bg-info'
    case 'terminé':
      return 'bg-success'
    case 'en pause':
      return 'bg-warning'
    case 'arrêté':
      return 'bg-error'
    case 'prévu':
      return 'bg-primary'
    default:
      return 'bg-neutral-content'
  }
})

const formattedStatus = computed(() => {
  if (!props.status) return ''
  return useCapitalizeFirstLetter(props.status)
})
</script>

<template>
  <div class="bg-neutral inline-flex h-full items-center gap-1 rounded-full px-1.5 py-1">
    <StatusDotComp class="h-2 w-2" :color-class="dotColorClass" />

    <span class="text-neutral-content p-[1px] text-xs leading-none font-medium">
      {{ formattedStatus }}
    </span>
  </div>
</template>
