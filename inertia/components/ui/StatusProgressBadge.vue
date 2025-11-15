<script setup lang="ts">
import type { MediaStatuses } from '#types/MediaStatuses'
import { computed, type PropType } from 'vue'
import StatusDotComp from '~/components/ui/StatusDotComp.vue'

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
</script>

<template>
  <div class="bg-neutral inline-flex items-center gap-1.5 rounded-full px-2.5 py-1">
    <StatusDotComp class="h-2 w-2" :color-class="dotColorClass" />

    <span class="text-neutral-content text-xs font-medium">
      {{ status }}
    </span>
  </div>
</template>
